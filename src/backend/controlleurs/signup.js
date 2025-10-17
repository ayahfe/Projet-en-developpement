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
