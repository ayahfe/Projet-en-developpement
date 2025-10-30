import { Link } from "react-router-dom";
export default function LoginRequired(){
  return (
    <div style={{ padding:24 }}>
      <h3>Connexion requise</h3>
      <p><Link to="/login" className="mp-btn primary">Se connecter</Link></p>
    </div>
  );
}
