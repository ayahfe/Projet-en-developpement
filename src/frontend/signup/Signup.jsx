import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState("client");
  const [err, setErr] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    setErr("");
    try {
      await signUp(email, pwd, role);
      navigate("/");
    } catch (e) {
      setErr(e.message ?? "Échec inscription");
    }
  }

  return (
    <form onSubmit={submit} className="signup-form">
      <h2>Créer un compte</h2>
      {err && <div className="control-error">{err}</div>}
      <div className="control"><label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required/>
      </div>
      <div className="control"><label>Mot de passe</label>
        <input value={pwd} onChange={e=>setPwd(e.target.value)} type="password" required/>
      </div>
      <div className="control"><label>Rôle</label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="client">Client</option>
          <option value="medecin">Médecin</option>
          <option value="pharmacien">Pharmacien</option>
        </select>
      </div>
      <div className="form-actions">
        <button className="mp-btn primary" type="submit">Créer le compte</button>
      </div>
    </form>
  );
}
