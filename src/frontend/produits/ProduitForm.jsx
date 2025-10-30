import { useParams } from "react-router-dom";

export default function ProduitForm(){
  const { id } = useParams();
  const isEdit = !!id;
  return (
    <form className="signup-form">
      <h2>{isEdit ? "Modifier" : "Créer"} un produit</h2>
      <div className="control"><label>Titre</label><input /></div>
      <div className="control"><label>Description</label><input /></div>
      <div className="control"><label>Prix</label><input type="number" step="0.01" /></div>
      <div className="form-actions">
        <button className="mp-btn primary" type="button">Enregistrer</button>
      </div>
    </form>
  );
}
