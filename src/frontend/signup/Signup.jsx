import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
    terms: false
  });
  
  const [errors, setErrors] = useState({
    passwordMatch: true,
    form: ""
  });
  
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user types
    if (name === 'password' || name === 'confirmPassword') {
      setErrors(prev => ({ ...prev, passwordMatch: true }));
    }
    setErrors(prev => ({ ...prev, form: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, passwordMatch: false }));
      return;
    }
    
    if (!formData.terms) {
      alert("Veuillez accepter les conditions d'utilisation");
      return;
    }
    
    try {
      setPending(true);
      setErrors({ passwordMatch: true, form: "" });
      
      // Use the signup function from AuthContext
      await signup(formData.email, formData.password);
      
      alert("Compte créé avec succès ! Vérifiez votre email pour confirmation.");
      navigate("/login");
      
    } catch (error) {
      console.error("Signup error:", error);
      setErrors(prev => ({ 
        ...prev, 
        form: error.message || "Erreur lors de la création du compte" 
      }));
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="auth-screen">
      <form onSubmit={handleSubmit} className="auth-card appear">
        <h2>Créer un compte</h2>
        <p>Inscrivez-vous pour accéder à l'Espace clinique/pharmacie</p>

        {/* Error message */}
        {errors.form && (
          <div className="control-error" style={{ 
            marginBottom: '15px', 
            padding: '10px', 
            background: 'rgba(255, 107, 107, 0.2)', 
            borderRadius: '8px',
            border: '1px solid rgba(255, 107, 107, 0.3)'
          }}>
            ⚠️ {errors.form}
          </div>
        )}

        <div className="control">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            required
            disabled={pending}
          />
        </div>

        <div className="control">
          <label htmlFor="password">Mot de passe</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={pending}
          />
        </div>

        <div className="control">
          <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={pending}
          />
          {!errors.passwordMatch && (
            <div className="control-error">
              <p>Les mots de passe doivent correspondre</p>
            </div>
          )}
        </div>

        {/* Role selection */}
        <div className="control">
          <label>Je suis :</label>
          <div className="role-selection">
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="client"
                checked={formData.role === "client"}
                onChange={handleChange}
                disabled={pending}
              />
              <span>Client</span>
            </label>
            
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="pharmacien"
                checked={formData.role === "pharmacien"}
                onChange={handleChange}
                disabled={pending}
              />
              <span>Pharmacien</span>
            </label>
            
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="medecin"
                checked={formData.role === "medecin"}
                onChange={handleChange}
                disabled={pending}
              />
              <span>Médecin</span>
            </label>
          </div>
        </div>

        <hr />

        <div className="control checkbox-control">
          <label htmlFor="terms">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              disabled={pending}
            />
            J'accepte les conditions d'utilisation
          </label>
        </div>

        <div className="form-actions">
          <Link to="/login">
            <button 
              type="button" 
              className="button button-flat"
              disabled={pending}
            >
              Se connecter
            </button>
          </Link>
          <button 
            type="submit" 
            className="button"
            disabled={pending}
          >
            {pending ? "Création..." : "Créer un compte"}
          </button>
        </div>
      </form>
    </div>
  );
}