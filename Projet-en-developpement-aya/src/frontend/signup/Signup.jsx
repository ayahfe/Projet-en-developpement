import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate();
    const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        
        if(data.password !== data["confirm-password"]){
            setPasswordAreNotEqual(true);
            return;
        }

        setPasswordAreNotEqual(false);

        alert("Compte créé avec succès!");
        navigate("/login")

        event.target.reset();
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>Créer un compte</h2>
            <p>Inscrivez-vous pour accéder à l'Espace clinique/pharmacie</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required/>
            </div>
            <div className="control">
                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" name="password" required/>
            </div>
            <div className="control">
                <label htmlFor="confirm-password">Confirmez le mot de passe</label>
                <input
                    id="confirm-password"
                    type="password"
                    name="confirm-password"
                    required
                />
                {passwordAreNotEqual&&(
                    <div className="control-error">
                        <p>Les mots de passe doivent correspondre</p>
                    </div>
                )}
            </div>
            <hr/>
            <div className="control checkbox-control">
                <label htmlFor="terms-and-conditions">
                    <input
                    type="checkbox"
                    id="terms-and-conditions"
                    name="terms"
                    required
                    />
                    J'accepte les conditions d'utilisation
                </label>
            </div>
            <p className="form-actions">
                <Link to="/login">
                <button type="button" className="button button-flat">
                    Se connecter
                </button>
                </Link>
                <button type="submit" className="button">
                    Créer un compte
                </button>
            </p>
        </form>
    )
}