import { PRESCRIPTIONS } from "../../../data/prescriptions";
import "./ShowPrescription.css";
import "../addPrescription/AddPrescription.css";
import { Link } from "react-router-dom";

function ShowPrescription({ prescription }) {
  return (
    <div>
      <div className="form-rx">
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
      <p>Nom médecin : {prescription.nom}</p>
      <p>License médecin : {prescription.license}</p>
      </div>
      <p className="row-rx-button">
        <Link to="/medecins/modify/:id">
          <button type="submit" className="button-rx-modify">
            Modifier
          </button>
        </Link>
        <Link to="/medecins/delete">
          <button type="submit" className="button-rx-delete">
            Supprimer
          </button>
        </Link>
      </p>
    </div>
  );
}
export default function ShowPrescriptionList() {
  return (
    <div className="form-rx">
      <h2>Prescriptions</h2>
      <Link to="/medecins/add">
        <button type="submit" className="rx-button">
          Ajouter une prescription
        </button>
      </Link>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {PRESCRIPTIONS.map((prescription) => (
          <ShowPrescription key={prescription.id} prescription={prescription} />
        ))}
      </div>
    </div>
  );
}
