import { storageHelper } from "./userFunctions.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuSidebar from "./menuSidebar.jsx";
import "./main.css"

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const session = storageHelper.getCurrentUser();
        if (!session) {
            navigate("/login");
        }}, []);
        
  return (
    <>
    <MenuSidebar pageAtive={"Início"}/>
      <div className="container">
        <h1>Bem-vindo à Página Inicial</h1>
        <p>Esta é a página inicial do aplicativo.</p>
      </div>
    </>
  );
}