import { useOutletContext, Link } from "react-router-dom";
import "./ShowPrescription.css";
import "../addPrescription/AddPrescription.css";

function ShowPrescription({ prescription, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Voulez-vous vraiment supprimer la prescription de ${prescription.nom} ${prescription.prenom} ?`)) {
      onDelete(prescription.id);
    }
  };

  return (
    <div className="prescription-card">
      <div className="prescription-content">
        <p>id : {prescription.id}</p>
        <p>Nom Institut : {prescription.nomInstitut}</p>
        <p>Date : {prescription.date}</p>
        <p>RAMQ : {prescription.ramq}</p>
        <p>Nom : {prescription.nom}</p>
        <p>Prénom : {prescription.prenom}</p>
        <p>Téléphone : {prescription.telephone}</p>
        <p>Nom de la molécule : {prescription.nomMolecule}</p>
        <p>Force : {prescription.force}</p>
        <p>Quantité : {prescription.quantite}</p>
        <p>Renouvellement : {prescription.renouvellement}</p>
        <p>Posologie : {prescription.posologie}</p>
        <p>Nom médecin : {prescription.nomMedecin}</p>
        <p>License médecin : {prescription.license}</p>
      </div>
      <p className="row-rx-button">
        <Link to={`/medecins/modify/${prescription.id}`}>
          <button type="button" className="button-rx-modify">
            Modifier
          </button>
        </Link>
        <button type="button" onClick={handleDelete} className="button-rx-delete">
          Supprimer
        </button>
      </p>
    </div>
  );
}

export default function ShowPrescriptionList() {
  const { prescriptions, deletePrescriptionHandler } = useOutletContext();

  return (
    <div className="form-rx">
      <div className="header-with-button"> 
        <h2>Prescriptions</h2>
        <Link to="/medecins/add">
          <button type="button" className="rx-button">
            Ajouter une prescription
          </button>
        </Link>
      </div>
      <div className="prescription-grid">
        {prescriptions.length === 0 ? (
          <p className="no-prescriptions">Aucune prescription disponible.</p>
        ) : (
          prescriptions.map((prescription) => (
            <ShowPrescription 
              key={prescription.id} 
              prescription={prescription}
              onDelete={deletePrescriptionHandler}
            />
          ))
        )}
      </div>
    </div>
  );
}