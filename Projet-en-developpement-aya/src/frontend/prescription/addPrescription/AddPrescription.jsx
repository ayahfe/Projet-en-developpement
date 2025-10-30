import "./AddPrescription.css";

const AddPrescription = () => {
  const addPrescriptionSubmitHandler = () => {};
  return (
    <form className="form-rx" onSubmit={addPrescriptionSubmitHandler}>
      <h2>Ajouter une Prescription</h2>
      <div className="control champs">
        <div className="row-rx">
          <div className="column-rx ">
            <h3>Informations Patient</h3>
            <label htmlFor="nomInstitut">Nom de l'institut</label>
            <input id="nomInstitut" type="text" name="nomInstitut" required />
            <label htmlFor="date">Date</label>
            <input id="date" type="text" name="date" required />
            <label htmlFor="ramq">Numéro de RAMQ</label>
            <input id="ramq" type="text" name="ramq" required />
            <label htmlFor="nom">Nom</label>
            <input id="nom" type="text" name="nom" required />
            <label htmlFor="prenom">Prénom</label>
            <input id="prenom" type="text" name="prenom" required />
            <label htmlFor="telephone">Téléphone</label>
            <input id="telephone" type="text" name="telephone" required />
          </div>
          <div className="column-rx">
            <h3>Informations Prescription</h3>
            <label htmlFor="nomMolecule">Nom de la molécule</label>
            <input id="nomMolecule" type="text" name="nomMolecule" required />
            <label htmlFor="force">Force</label>
            <input id="force" type="text" name="force" required />
            <label htmlFor="quantite">Quantité</label>
            <input id="quantite" type="text" name="quantite" required />
            <label htmlFor="renouvellement">Renouvellement</label>
            <input
              id="renouvellement"
              type="text"
              name="renouvellement"
              required
            />
            <label htmlFor="posologie">Posologie</label>
            <input id="posologie" type="text" name="posologie" required />
          </div>
        </div>
        <div className="column-rx-signature">
          <h3>Signature</h3>
          <div className="row-rx">
            <div className="row-rx-signature">
              <label htmlFor="title">Nom du médecin</label>
              <input id="title" type="title" name="title" required />
            </div>
            <div className="row-rx-signature">
              <label htmlFor="title">License</label>
              <input id="title" type="title" name="title" required />
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
export default AddPrescription;
