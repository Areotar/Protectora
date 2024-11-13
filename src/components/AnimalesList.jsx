import { useEffect, useState } from "react";
import AnimalDetail from "./AnimalDetail";

export default function AnimalesList() {
    const [animales, setAnimales] = useState([])
    const [filtradoAnimales, setFiltradoAnimales] = useState([])
    const [error, setError] = useState(false);
    const [tipoFilter, setTipoFilter] = useState("")
    const [edadFilter, setEdadFilter] = useState(20)
    const [sexoFilter, setSexoFilter] = useState("")
    const [esterilizadoFilter, setEsterilizadoFilter] = useState(false)
    const [selectedAnimalId, setSelectedAnimalId] = useState(null);

    // Fetch inicial para cargar datos
    useEffect(() => {
        fetch("https://huachitos.cl/api/animales")
            .then(response => response.json())
            .then(data => {
                setAnimales(data.data || []);
                setFiltradoAnimales(data.data || []);
            })
            .catch(error => {
                console.error("Error fetching data", error);
                setError(true);
            });
    }, []);

    // Filtrar datos
    useEffect(() => {
        const filtrado = animales.filter(item => {
            const edadNumerica = parseInt(item.edad)
            const menor_edad = item.edad.includes('Meses')
            const mayor_edad = item.edad.includes('Años') || item.edad.includes('Año')
            return (
                (tipoFilter === "" || item.tipo === tipoFilter) &&
                (sexoFilter === "" || item.genero === sexoFilter) &&
                (isNaN(edadNumerica) || (
                    (edadFilter === 0 && menor_edad) ||
                    (edadFilter > 0 && mayor_edad && edadNumerica <= edadFilter)
                )) &&
                (!esterilizadoFilter || item.esterilizado === 1)
            );
        });
        setFiltradoAnimales(filtrado);
    }, [tipoFilter, edadFilter, sexoFilter, esterilizadoFilter, animales]);

    const handleAnimalClick = (id) => {
        setSelectedAnimalId(id === selectedAnimalId ? null : id)
    };

    // Actualiza la lista de animales filtrada
    let listAnimales = null;
    if (error) {
        listAnimales = <p style={{ textAlign: "center" }}>Ha ocurrido un error</p>;
    } else {
        listAnimales = filtradoAnimales.map(item => (
            <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                <h3 onClick={() => handleAnimalClick(item.id)}>{item.nombre}</h3>
                <p>Tipo: {item.tipo}</p>
                <p>Edad: {item.edad}</p>
                <p>Sexo: {item.genero}</p>
                <p>Esterilizado: {item.esterilizado === 1 ? "Sí" : "No"}</p>
                <img src={item.imagen} alt={`${item.nombre}`} style={{ width: "200px", height: "auto" }} />

                {selectedAnimalId === item.id && (
                    <div style={{ marginTop: "10px" }}>
                        <AnimalDetail animal={item} />
                    </div>
                )}
            </div>
        ));
    }
    return (
        <div>
            <h2>Animales en adopción</h2>
            <div>
                <label htmlFor="tipoFiltro">Filtrar por tipo:</label>
                <select id="tipoFiltro" value={tipoFilter} onChange={e => setTipoFilter(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Conejo">Conejo</option>
                </select>
            </div>
            <div>
                <label htmlFor="sexoFiltro">Filtrar por sexo:</label>
                <select id="sexoFiltro" value={sexoFilter} onChange={e => setSexoFilter(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="macho">Macho</option>
                    <option value="hembra">Hembra</option>
                </select>
            </div>
            <div>
                <label htmlFor="esterilizadoFiltro">Mostrar solo esterilizados:</label>
                <input
                    type="checkbox"
                    id="esterilizadoFiltro"
                    checked={esterilizadoFilter}
                    onChange={e => setEsterilizadoFilter(e.target.checked)}
                />
            </div>
            <div>
                <label htmlFor="edadFiltro">
                    Edad máxima: {edadFilter === 0 ? "Menor de un año" : `${edadFilter} años`}
                </label>
                <input
                    type="range"
                    id="edadFiltro"
                    min="0"
                    max="20"
                    value={edadFilter}
                    onChange={e => setEdadFilter(parseInt(e.target.value))}
                />
            </div>
            <div>
                {listAnimales}
            </div>
        </div>
    );
}
