app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) return res.status(401).json({ error: "Identifiants invalides" });

const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Identifiants invalides" });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, email: user.email } });
<<<<<<< HEAD
});
=======
});
>>>>>>> origin/temp-visualiser-fix
