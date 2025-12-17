
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email et mot de passe requis" });

  const passwordHash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: passwordHash }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  const token = jwt.sign({ id: data.id, email }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
  res.status(201).json({ token, user: { id: data.id, email } });
});

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const app = express();
const PORT = 4000;
const JWT_SECRET = "devsecret"; // change en prod

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // ← ajoute 5173
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// "BDD" en mémoire (perd tout au redémarrage)
const users = []; // { id, email, passwordHash }

// Middleware: Authorization: Bearer <token>
function requireAuth(req, _res, next) {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) return next({ status: 401, msg: "Non authentifié" });
  try {
    req.user = jwt.verify(auth.slice(7), JWT_SECRET); // { id, email }
    next();
  } catch {
    next({ status: 401, msg: "Jeton invalide ou expiré" });
  }
}

// Signup
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email et mot de passe requis" });
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase()))
    return res.status(409).json({ error: "Cet email existe déjà" });

  const id = String(users.length + 1);
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ id, email, passwordHash });

  const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "7d" });
  res.status(201).json({ token, user: { id, email } });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email.toLowerCase() === (email || "").toLowerCase());
  if (!user) return res.status(401).json({ error: "Identifiants invalides" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Identifiants invalides" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, email: user.email } });
});

// Logout (stateless)
app.post("/api/auth/logout", (_req, res) => res.json({ message: "Déconnecté" }));

// Me (protégée)
app.get("/api/auth/me", requireAuth, (req, res) => {
  const me = users.find(u => u.id === req.user.id);
  if (!me) return res.status(401).json({ error: "Non authentifié" });
  res.json({ id: me.id, email: me.email });
});

// Ex. route protégée
app.get("/api/private", requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user });
});

// Gestion simple des erreurs
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.msg || "Erreur serveur" });
});

app.listen(PORT, () => console.log(`API : http://localhost:${PORT}`));
