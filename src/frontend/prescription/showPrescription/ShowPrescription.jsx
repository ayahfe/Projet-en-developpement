// src/frontend/prescription/showPrescription/ShowPrescription.jsx
import React from "react";
import { Link } from "react-router-dom";
import { PRESCRIPTIONS } from "../../../data/prescriptions";
import "./ShowPrescription.css";

// Composant pour afficher une seule prescription
function PrescriptionCard({ prescription }) {
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
        
        <p><strong>Médecin :</strong> {prescription.nomMedecin || prescription.nom}</p>
        <p><strong>License :</strong> {prescription.license}</p>
      </div>
      
      <div className="row-rx-button">
        <Link to={`/medecins/modify/${prescription.id}`}>
          <button className="button-rx-modify">Modifier</button>
        </Link>
        
        <Link to={`/medecins/delete/${prescription.id}`}>
          <button className="button-rx-delete">Supprimer</button>
        </Link>
      </div>
    </div>
  );
}

// Composant principal qui affiche la liste des prescriptions
export default function ShowPrescriptionList() {
  return (
    <div className="prescription-page" style={{ paddingTop: "80px" }}>
      <div className="form-rx">
        <h2 className="page-title">Prescriptions</h2>
        
        <div style={{ marginBottom: "30px" }}>
          <Link to="/medecins/add">
            <button type="submit" className="rx-button">
              Ajouter une prescription
            </button>
          </Link>
        </div>
        
        <div className="prescription-grid">
          {PRESCRIPTIONS && PRESCRIPTIONS.length > 0 ? (
            PRESCRIPTIONS.map((prescription) => (
              <PrescriptionCard 
                key={prescription.id} 
                prescription={prescription} 
              />
            ))
          ) : (
            <p>Aucune prescription disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}