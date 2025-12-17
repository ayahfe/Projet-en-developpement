import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import "../addPrescription/AddPrescription.css"; 

const ModifyPrescription = () => {
    const { id } = useParams();
    const { prescriptions, modifyPrescriptionHandler } = useOutletContext();
    const navigate = useNavigate();
    const originalPrescription = prescriptions.find((rx) => rx.id === id);
    const [formData, setFormData] = useState(
        originalPrescription || {
            nomInstitut: "",
            date: "",
            ramq: "",
            nom: "",
            prenom: "",
            telephone: "",
            nomMolecule: "",
            force: "",
            quantite: "",
            renouvellement: "",
            posologie: "",
            nomMedecin: "",
            license: "",
        }
    );
    useEffect(() => {
        if (!originalPrescription) {
            alert("Prescription non trouvée ! Redirection vers la liste.");
            navigate("/medecins", { replace: true });
        }
    }, [originalPrescription, navigate]);
        if (!originalPrescription) {
        return <p className="form-rx">Chargement ou Prescription non trouvée...</p>;
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const modifyPrescriptionSubmitHandler = (event) => {
        event.preventDefault();
        modifyPrescriptionHandler(id, formData);
        navigate("/medecins");
    };

    return (
        <form className="form-rx" onSubmit={modifyPrescriptionSubmitHandler}>
            <h2>Modifier la Prescription (ID: {id})</h2>
            <div className="control champs">
                <div className="row-rx">
                    <div className="column-rx ">
                        <h3>Informations Patient</h3>

                        <label htmlFor="nomInstitut">Nom de l'institut</label>
                        <input id="nomInstitut" type="text" name="nomInstitut" required
                            value={formData.nomInstitut} onChange={handleInputChange} />

                        <label htmlFor="date">Date</label>
                        <input id="date" type="date" name="date" required
                            value={formData.date} onChange={handleInputChange} />

                        <label htmlFor="ramq">Numéro de RAMQ</label>
                        <input id="ramq" type="text" name="ramq" required
                            value={formData.ramq} onChange={handleInputChange} />

                        <label htmlFor="nom">Nom</label>
                        <input id="nom" type="text" name="nom" required
                            value={formData.nom} onChange={handleInputChange} />

                        <label htmlFor="prenom">Prénom</label>
                        <input id="prenom" type="text" name="prenom" required
                            value={formData.prenom} onChange={handleInputChange} />

                        <label htmlFor="telephone">Téléphone</label>
                        <input id="telephone" type="text" name="telephone" required
                            value={formData.telephone} onChange={handleInputChange} />
                    </div>
                    <div className="column-rx">
                        <h3>Informations Prescription</h3>

                        <label htmlFor="nomMolecule">Nom de la molécule</label>
                        <input id="nomMolecule" type="text" name="nomMolecule" required
                            value={formData.nomMolecule} onChange={handleInputChange} />

                        <label htmlFor="force">Force</label>
                        <input id="force" type="text" name="force" required
                            value={formData.force} onChange={handleInputChange} />

                        <label htmlFor="quantite">Quantité</label>
                        <input id="quantite" type="text" name="quantite" required
                            value={formData.quantite} onChange={handleInputChange} />

                        <label htmlFor="renouvellement">Renouvellement</label>
                        <input id="renouvellement" type="text" name="renouvellement" required
                            value={formData.renouvellement} onChange={handleInputChange} />

                        <label htmlFor="posologie">Posologie</label>
                        <input id="posologie" type="text" name="posologie" required
                            value={formData.posologie} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="column-rx-signature">
                    <h3>Signature</h3>
                    <div className="row-rx">
                        <div className="row-rx-signature">
                            <label htmlFor="nomMedecin">Nom du médecin</label>
                            <input id="nomMedecin" type="text" name="nomMedecin" required
                                value={formData.nomMedecin} onChange={handleInputChange} />
                        </div>
                        <div className="row-rx-signature">
                            <label htmlFor="license">License</label>
                            <input id="license" type="text" name="license" required
                                value={formData.license} onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <p className="form">
                    <button type="submit" className="button">
                        Sauvegarder les Modifications
                    </button>
                    <button 
                        type="button" 
                        className="button-cancel"
                        onClick={() => navigate("/medecins")}
                        style={{ marginLeft: "10px", backgroundColor: "#dc3545" }}
                    >
                        Annuler
                    </button>
                </p>
            </div>
        </form>
    );
};

export default ModifyPrescription;