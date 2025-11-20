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
import { Link } from "react-router-dom";

function ShowPrescription({ prescription }) {
  return (
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
    </div>
  );
}

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
    </div>
  );
}
