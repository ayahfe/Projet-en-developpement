// src/frontend/prescriptions/AddPrescription.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supaBaseClient.js";
import { useAuth } from "../AuthContext";
import "./AddPrescription.css";

const TABLE_NAME = "ordonnances"; // change en "prescriptions" si tu as gardé ce nom

export default function AddPrescription() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    medicament: "",
    dosage: "",
    instructions: "",
    patientEmail: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    // si non connecté → rien
  }, [user]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function findPatientIdByEmail(email) {
    if (!email) return null;
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (error) throw error;
    return data?.id ?? null;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setSaving(true);
    try {
      if (!user?.id) throw new Error("Vous devez être connecté.");

      const patient_id = await findPatientIdByEmail(form.patientEmail);

      const payload = {
        medicament: form.medicament,
        dosage: form.dosage,
        instructions: form.instructions,
        medecin_id: user.id,
        patient_id, // peut être null si email vide ou introuvable
      };

      const { error } = await supabase.from(TABLE_NAME).insert([payload]);
      if (error) throw error;

      setForm({ medicament: "", dosage: "", instructions: "", patientEmail: "" });
      alert("Ordonnance ajoutée.");
    } catch (er) {
      setErr(er.message || "Erreur d’enregistrement");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="rx-form" onSubmit={onSubmit} style={{ maxWidth: 520, margin: "24px auto" }}>
      <h2>Nouvelle ordonnance</h2>

      <label>Patient (email)
        <input name="patientEmail" value={form.patientEmail} onChange={onChange} placeholder="patient@exemple.com" />
      </label>

      <label>Médicament
        <input name="medicament" value={form.medicament} onChange={onChange} required />
      </label>

      <label>Dosage
        <input name="dosage" value={form.dosage} onChange={onChange} required />
      </label>

      <label>Instructions
        <textarea name="instructions" value={form.instructions} onChange={onChange} />
      </label>

      {err && <p className="error" style={{ color: "#d32f2f" }}>{err}</p>}
      <button disabled={saving}>{saving ? "Enregistrement..." : "Ajouter"}</button>
    </form>
  );
}
