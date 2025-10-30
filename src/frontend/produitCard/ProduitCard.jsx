export default function ProduitCard({ produit }) {
  const { titre, description, prix, image_url } = produit;

  return (
    <article style={{
      background:"#0f172a", border:"1px solid #1e293b", borderRadius:12, padding:16
    }}>
      <div style={{
        height:160, background:"#0b1226", borderRadius:8,
        display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12
      }}>
        {image_url ? (
          <img src={image_url} alt={titre} style={{ maxHeight:150, maxWidth:"95%" }} />
        ) : (
          <span style={{ color:"#475569" }}>Pas d’image</span>
        )}
      </div>

      <h3 style={{ color:"#fff", margin:"0 0 8px" }}>{titre}</h3>
      <p style={{ color:"#94a3b8", minHeight:48 }}>{description}</p>
      <p style={{ color:"#22c55e", fontWeight:700 }}>{Number(prix).toFixed(2)} $</p>
    </article>
  );
}
