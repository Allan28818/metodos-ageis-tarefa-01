import { useEffect, useState } from "react";
import { storageHelper } from "./userFunctions.js";
import { useNavigate } from "react-router-dom";
import "./index.css";
import "./authpages.css"

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [completeName, setCompleteName] = useState("");
  const [ra, setRa] = useState("");
  const [course, setCourse] = useState("");
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const userExists = storageHelper.existsUser(email, ra);
    if (userExists) {
      alert("Usuário já cadastrado com este email e matrícula.");
    } else {
        const newUser = {
        completeName,
        email,
        ra,
        course,
        password,
      };
        storageHelper.saveUser(newUser);
        alert("Login bem-sucedido!");
        navigate("/login");
    }
};
useEffect(()=>{
     document.body.style.backgroundImage = "url('/background.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
})
  return (
    <div className={"authPages"}>
      <div className="container">
        <form onSubmit={handleRegister}>
          <h1>Cadastrar-se</h1>
          <p>Nome completo</p>
          <input
            value={completeName}
          onChange={(e) => setCompleteName(e.target.value)}
          placeholder="Digite seu nome completo" />
          <p>Email institucional</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
          <p>Matrícula</p>
          <input 
          value={ra}
            onChange={(e) => setRa(e.target.value)}
            placeholder="Digite sua matrícula"
            required
          /> 
          <p>Curso</p>
            <input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Digite seu curso"
            required
          />
          <p>Senha</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />

          <button type="submit">Criar conta</button>
        </form>
        <p>
         Já tem conta? <a href="/">Faça login</a>
        </p>
        <p className="footer">
          © 2025 Equipe A - Métodos Ágeis — Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
export default Register;
