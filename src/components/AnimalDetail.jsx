export default function AnimalDetail({ animal }) {
    if (!animal) {
        return <h2>No se seleccionó ningún animal</h2>;
    }

    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}>
            <h3>{animal.nombre} - Detalles</h3>
            <p><strong>Tipo:</strong> {animal.tipo}</p>
            <p><strong>Edad:</strong> {animal.edad}</p>
            <p><strong>Sexo:</strong> {animal.genero}</p>
            <p><strong>Esterilizado:</strong> {animal.esterilizado === 1 ? "Sí" : "No"}</p>
            <p><strong>Descripción Física:</strong> {animal.desc_fisica || "Sin informacion"}</p>
            <p><strong>Personalidad:</strong> {animal.desc_personalidad || "Sin informacion"}</p>
            <p><strong>Información Adicional:</strong> {animal.desc_adicional || "Sin informacion"}</p>
            <p><strong>Comuna:</strong> {animal.comuna || "Sin informacion"}</p>
            <img src={animal.imagen} alt={`${animal.nombre}`} style={{ width: "300px", height: "auto" }} />
        </div>
    );
}
