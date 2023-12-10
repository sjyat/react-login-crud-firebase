import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Settings from "../components/pages/Settings";
import Products from "../components/pages/products/Products";
import Clientes from "../components/pages/clientes/Clientes";
import Dashboard from "../components/pages/Dashboard";
import Analytics from "../components/pages/Analytics";
import Shopping from "../components/pages/Shopping";
import Informe from "../components/pages/Informe";

import app from "../firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Swal from "sweetalert2";

//getFirestores, getFirestore,collection, addDoc,getDocs,doc,deleteDoc .. gestion de la base de datos NoSql
const auth = getAuth(app);

//const db = getFirestore(app) // inicializa la base datos

export default function Home({ correoUsuario }) {
  return (
    <>
      <div className="container">
        <h3>
          ¡Hola <strong style={{ color: "Blue" }}>{correoUsuario}!</strong> Haz
          Iniciado Sesión
        </h3>
      </div>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/resultados" element={<Informe />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
