import { useState } from "react"

export default function FormAdopcion({ setMessage }) {

    const [formData, setFormData] = useState({
        nombre: "",
        nombre_animal: "",
        email: "",
        telefono: "",
        direccion: "",
        tipo_casa: "",
        patio: false,
        mascotas: false,
        motivo: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleAdopcion = () => {
        fetch("https://huachitos.cl/api/animales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                if (responseData.success) {
                    setMessage("¡Solicitud de adopción enviada!");
                } else {
                    setMessage("Error al enviar la solicitud. Intenta de nuevo.");
                }
            })
            .catch(error => {
                setMessage("¡Solicitud de adopción enviada! (Siempre da error ya que no se envia a ningun sitio)");
                console.error(error);
            });
    };

    return (
        <form style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Solicitud de Adopción</h2>
    
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Nombre Completo:
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>
    
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Nombre del animal al que quiere adoptar:
            </label>
            <input
              type="text"
              name="nombre_animal"
              value={formData.nombre_animal}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>
    
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>
    
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>
    
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>
    
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Tipo de Hogar:</label>
            <select
              name="tipo_casa"
              value={formData.tipo_casa}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            >
              <option value="" disabled>
                Seleccionar
              </option>
              <option value="piso">Piso</option>
              <option value="casa">Casa</option>
              <option value="otro">Otro</option>
            </select>
          </div>
    
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "inline-block", marginRight: "10px" }}>
              ¿Tiene patio?
            </label>
            <input
              type="checkbox"
              name="patio"
              checked={formData.patio}
              onChange={handleChange}
            />
          </div>
    
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "inline-block", marginRight: "10px" }}>
              ¿Tiene otros animales?
            </label>
            <input
              type="checkbox"
              name="mascotas"
              checked={formData.mascotas}
              onChange={handleChange}
            />
          </div>
    
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              ¿Por qué quiere adoptar?
            </label>
            <textarea
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                minHeight: "120px",
              }}
            />
          </div>
    
          <button
            type="button"
            onClick={handleAdopcion}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "18px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            Enviar formulario
          </button>
        </form>
      );
    }