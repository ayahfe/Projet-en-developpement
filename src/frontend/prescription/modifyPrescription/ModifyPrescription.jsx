import "../addPrescription/AddPrescription.css";

const ModifyPrescription = () => {
  const modifyPrescriptionSubmitHandler = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log("prescription modifiée", data);
    event.target.reset();
  };

  return (
    <form className="form-rx" onSubmit={modifyPrescriptionSubmitHandler}>
      <h2>Modifier une Prescription</h2>

      <div className="control champs">
        <div className="row-rx">
          <div className="column-rx">
            <h3>Informations Patient</h3>

            <label>Nom de l'institut</label>
            <input name="institut" required />

            <label>Date</label>
            <input type="date" name="date" required />

            <label>Numéro de RAMQ</label>
            <input name="ramq" required />

            <label>Nom</label>
            <input name="nom" required />

            <label>Prénom</label>
            <input name="prenom" required />

            <label>Téléphone</label>
            <input name="telephone" required />
          </div>

          <div className="column-rx">
            <h3>Informations Prescription</h3>

            <label>Nom de la molécule</label>
            <input name="molecule" required />

            <label>Force</label>
            <input name="force" required />

            <label>Quantité</label>
            <input name="quantite" required />

            <label>Renouvellement</label>
            <input name="renouvellement" required />

            <label>Posologie</label>
            <input name="posologie" required />
          </div>
        </div>

        <div className="column-rx-signature">
          <h3>Signature</h3>

          <div className="row-rx">
            <div className="row-rx-signature">
              <label>Nom du médecin</label>
              <input name="medecin" required />
            </div>

            <div className="row-rx-signature">
              <label>Licence</label>
              <input name="licence" required />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <p className="form">
          <button type="submit" className="button">
            Enregistrer
          </button>
        </p>
      </div>
    </form>
  );
};

export default ModifyPrescription;
