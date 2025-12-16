<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// src/frontend/prescription/showPrescription/ShowPrescription.jsx
import React from "react";

export default function ShowPrescription() {
  return (
    <div className="show-prescription">
      <h2>Liste des prescriptions</h2>
      {/* Ton contenu ici */}
=======
// ShowPrescription.jsx
import { PRESCRIPTIONS } from "../../../data/prescriptions";
import "./ShowPrescription.css";
=======
import { PRESCRIPTIONS } from "../../../data/prescriptions";
=======
>>>>>>> 8918954 (tests logout)
import "./ShowPrescription.css";
import "../addPrescription/AddPrescription.css";
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
=======
import "./ShowPrescription.css";
import "../addPrescription/AddPrescription.css";
>>>>>>> 94976f165e7ffc3f1789fda29bf6a3f98722ee4f
import { Link } from "react-router-dom";

function ShowPrescription({ prescription }) {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="card-rx">
      <h3 className="rx-title">Ordonnance #{prescription.id}</h3>

      <div className="rx-info">
        <p><strong>Institut :</strong> {prescription.nomInstitut}</p>
        <p><strong>Date :</strong> {prescription.date}</p>
        <p><strong>RAMQ :</strong> {prescription.ramq}</p>

        <p><strong>Patient :</strong> {prescription.prenom} {prescription.nom}</p>
        <p><strong>Téléphone :</strong> {prescription.telephone}</p>

        <p><strong>Médicament :</strong> {prescription.nomMolecule}</p>
        <p><strong>Force :</strong> {prescription.force}</p>
        <p><strong>Quantité :</strong> {prescription.quantite}</p>

        <p><strong>Renouvellement :</strong> {prescription.renouvellement}</p>
        <p><strong>Posologie :</strong> {prescription.posologie}</p>

        <p><strong>Médecin :</strong> {prescription.nom}</p>
        <p><strong>License :</strong> {prescription.license}</p>
      </div>

      <div className="row-rx-button">
        <Link to={`/medecins/modify/${prescription.id}`}>
          <button className="button-rx-modify">Modifier</button>
        </Link>

        <Link to="/medecins/delete">
          <button className="button-rx-delete">Supprimer</button>
        </Link>
      </div>
=======
=======
>>>>>>> 94976f165e7ffc3f1789fda29bf6a3f98722ee4f
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
        <Link to={`/medecins/modify/${prescription.id}`}>
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
/*
function ShowPrescription({ prescription }) {
  return (
    <div className="card-rx">
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
        <p>Nom médecin : {prescription.medecin.nom}</p>
        <p>License médecin : {prescription.medecin.license}</p>
      </div>
      <p className="row-rx-button">
        <Link to={`/medecins/modify/${prescription.id}`}>
          <button type="submit" className="button-rx-modify">Modifier</button>
        </Link>
        <Link to="/medecins/delete">
          <button type="submit" className="button-rx-delete">Supprimer</button>
        </Link>
      </p>
<<<<<<< HEAD
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
=======
>>>>>>> 94976f165e7ffc3f1789fda29bf6a3f98722ee4f
    </div>
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
export default function ShowPrescriptionList() {
  return (
    <div className="prescription-page">
      <h2 className="page-title">Prescriptions</h2>

      <Link to="/medecins/add">
        <button className="rx-button">Ajouter une prescription</button>
      </Link>

      <div className="prescription-grid">
        {PRESCRIPTIONS.map((p) => (
          <ShowPrescription key={p.id} prescription={p} />
        ))}
      </div>
>>>>>>> origin/temp-visualiser-fix
=======
=======
>>>>>>> 94976f165e7ffc3f1789fda29bf6a3f98722ee4f
*/
export default function ShowPrescriptionList() {
  return (
    <div className="form-rx">
      <h2>Prescriptions</h2>
      <Link to="/medecins/add">
        <button type="submit" className="rx-button">
          Ajouter une prescription
        </button>
      </Link>
      <div className="prescription-grid">
        {PRESCRIPTIONS.map((prescription) => (
          <ShowPrescription key={prescription.id} prescription={prescription} />
        ))}
      </div>
<<<<<<< HEAD
>>>>>>> 9965a5d (feat(auth): rajout test cypress)
=======
>>>>>>> 94976f165e7ffc3f1789fda29bf6a3f98722ee4f
    </div>
  );
}
