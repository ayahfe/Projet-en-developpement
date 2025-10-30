
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
            <label htmlFor="title">Nom de l'institut</label>
            <input id="title" type="title" name="title" required />
            <label htmlFor="title">Date</label>
            <input id="title" type="title" name="title" required />
            <label htmlFor="title">Numéro de RAMQ</label>
            <input id="title" type="title" name="title" required />
            <label htmlFor="title">Nom</label>
            <input id="title" type="title" name="title" required />
            <label htmlFor="title">Prénom</label>
            <input id="title" type="title" name="title" required />
            <label htmlFor="title">Téléphone</label>
            <input id="title" type="title" name="title" required />
          </div>
          <div className="column-rx">
            <h3>Informations Prescription</h3>
            <label htmlFor="title">Nom de la molécule</label>
            <input id="title" type="title" name="title" required />
            <label htmlFor="title">Force</label>
            <input id="title" type="title" name="title" required />
            <label htmlFor="title">Quantité</label>
            <input id="title" type="title" name="title" required />
            <label htmlFor="title">Renouvellement</label>
            <input id="title" type="title" name="title" required />
            <label htmlFor="title">Posologie</label>
            <input id="title" type="title" name="title" required />
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
