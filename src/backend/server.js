require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

app.use(cors({
  origin: "http://localhost:5173", // adapte au port du frontend
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// --- Supabase ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // service_role côté backend
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Middleware JWT ---
function requireAuth(req, _res, next) {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) return next({ status: 401, msg: "Non authentifié" });
  try {
    req.user = jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    next({ status: 401, msg: "Jeton invalide ou expiré" });
  }
}

// --- Signup ---
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email et mot de passe requis" });

  // Vérifie si l’utilisateur existe déjà
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (existing) return res.status(409).json({ error: "Cet email existe déjà" });

  // Hash du mot de passe
  const passwordHash = await bcrypt.hash(password, 10);

  // Insère dans Supabase
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password_hash: passwordHash }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  // Génère un JWT
  const token = jwt.sign({ id: data.id, email }, JWT_SECRET, { expiresIn: "7d" });
  res.status(201).json({ token, user: { id: data.id, email } });
});

// --- Login ---
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) return res.status(401).json({ error: "Identifiants invalides" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Identifiants invalides" });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, email: user.email } });
});

// --- Me ---
app.get("/api/auth/me", requireAuth, async (req, res) => {
  const { data: user } = await supabase
    .from("users")
    .select("id,email")
    .eq("id", req.user.id)
    .single();

  if (!user) return res.status(401).json({ error: "Non authentifié" });
  res.json(user);
});

// --- Gestion erreurs ---
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.msg || "Erreur serveur" });
});


app.listen(PORT, () => console.log(`API : http://localhost:${PORT}`));
