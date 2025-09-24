import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./Login.css"

export default function Login() {
    const [entredValues, setEntredValues] = useState({
        email: "",
        password: "",
        role: "client",
    });
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleInputChange = (identifier, value) => {
        setEntredValues((prevValue)=> ({...prevValue, [identifier]: value}));
    };
    const authSubmitHandler = (event) => {
        event.preventDefault();
        const {email, password, role} = entredValues;

        if(!email|| !password){
            alert("Veuillez entrez vos identifiants");
            return;
        }
        login(role, email)

        navigate("/");
        setEntredValues({email: "", password: "", role: "client"});
    };

    return(
        <form onSubmit={authSubmitHandler}>
            <h2>Bienvenue</h2>
            <h3>Connectez-vous pour continuer</h3>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type= "email"
                        name = "email"
                        onChange={(event)=> handleInputChange("email", event.target.value)}
                        value={entredValues.email}
                        placeholder="Entrez votre email"
                        required
                    />
                </div>
                <div className="control no-margin">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        type= "password"
                        name = "password"
                        onChange={(event)=> handleInputChange("password", event.target.value)}
                        value={entredValues.password}
                        placeholder="Entrez votre mot de passe"
                        required
                    />
                </div>
                <div className="control no-margin">
                    <label htmlFor="role">Rôle</label>
                    <select
                    id="role"
                    name= "role"
                    value={entredValues.role}
                    onChange={(event)=>handleInputChange("role", event.target.value)}
                    >
                        <option value="client">Client</option>
                        <option value="pharmacien">Pharmacien</option>
                        <option value="medecin">Medecin</option>
                    </select>
                </div>
            </div>
            <p className="form-actions">
                <Link to="/signup">
                <button className="button button-flat" type="button">
                    Créer un compte
                </button>
                </Link>
                <button className="button" type="submit">
                    Se connecter
                </button>
            </p>
        </form>
    );
}