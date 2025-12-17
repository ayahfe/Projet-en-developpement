import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../addPrescription/AddPrescription.css";
import "./DeletePrescription.css";

const DeletePrescription = () => {
  const { prescriptions, deletePrescriptionHandler } = useOutletContext();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSelectChange = (event) => {
    setSelectedId(event.target.value);
    setShowConfirm(false);
    setSuccessMessage("");
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    if (selectedId) {
      setShowConfirm(true);
    }
  };

  const handleConfirmDelete = () => {
    deletePrescriptionHandler(selectedId);
    setSuccessMessage("Prescription supprimée avec succès!");
    setSelectedId("");
    setShowConfirm(false);
    
    // Navigate back to list after 1.5 seconds
    setTimeout(() => {
      navigate("/medecins");
    }, 1500);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const selectedPrescription = prescriptions.find(rx => rx.id === selectedId);

  return (
    <div className="form-rx">
      <h2>Supprimer une Prescription</h2>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleDeleteClick}>
        <div className="control champs">
          <label htmlFor="prescriptionSelect">
            Sélectionner une prescription à supprimer
          </label>
          <select
            id="prescriptionSelect"
            value={selectedId}
            onChange={handleSelectChange}
            required
            className="select-prescription"
          >
            <option value="">-- Choisir une prescription --</option>
            {prescriptions.map((prescription) => (
              <option key={prescription.id} value={prescription.id}>
                {prescription.nom} {prescription.prenom} - {prescription.nomMolecule} ({prescription.date})
              </option>
            ))}
          </select>

          {selectedPrescription && !showConfirm && (
            <div className="prescription-preview">
              <h3>Détails de la prescription</h3>
              <div className="preview-content">
                <p><strong>Patient:</strong> {selectedPrescription.nom} {selectedPrescription.prenom}</p>
                <p><strong>RAMQ:</strong> {selectedPrescription.ramq}</p>
                <p><strong>Téléphone:</strong> {selectedPrescription.telephone}</p>
                <p><strong>Molécule:</strong> {selectedPrescription.nomMolecule}</p>
                <p><strong>Force:</strong> {selectedPrescription.force}</p>
                <p><strong>Quantité:</strong> {selectedPrescription.quantite}</p>
                <p><strong>Médecin:</strong> {selectedPrescription.nomMedecin}</p>
                <p><strong>Date:</strong> {selectedPrescription.date}</p>
              </div>
            </div>
          )}

          {showConfirm && (
            <div className="confirm-dialog">
              <p className="confirm-message">
                ⚠️ Êtes-vous sûr de vouloir supprimer cette prescription ?
              </p>
              <p className="confirm-details">
                Patient: <strong>{selectedPrescription.nom} {selectedPrescription.prenom}</strong>
              </p>
              <div className="confirm-buttons">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="button-confirm-delete"
                >
                  Oui, supprimer
                </button>
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="button-cancel"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>

        {!showConfirm && (
          <div className="row">
            <p className="form">
              <button
                type="submit"
                className="button-rx-delete"
                disabled={!selectedId}
              >
                Supprimer
              </button>
              <button
                type="button"
                onClick={() => navigate("/medecins")}
                className="button-cancel"
              >
                Annuler
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default DeletePrescription;