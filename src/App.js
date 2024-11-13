import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AnimalesList from './components/AnimalesList';
import FormAdopcion from './components/FormAdopcion';
import { useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('');

  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/animales" style={{ margin: '10px' }}>Lista de Animales</Link>
          <Link to="/adopcion" style={{ margin: '10px' }}>Formulario de Adopción</Link>
        </nav>
        {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

        <Routes>
          {/* Ruta para la lista de animales */}
          <Route path="/animales" element={<AnimalesList />} />

          {/* Ruta para el formulario de adopción */}
          <Route path="/adopcion" element={<FormAdopcion setmensaje={setMensaje} />} />
          
          {/* Ruta por defecto */}
          <Route path="/" element={<div><h2>Bienvenido a la página de Adopción</h2><p>Selecciona una opción de arriba para continuar.</p></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
