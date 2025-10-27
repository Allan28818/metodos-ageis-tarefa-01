import { useState } from "react";
import { storageHelper } from "./userFunctions.js";
import { useNavigate } from "react-router-dom";
import "./authpages.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = storageHelper.login(email, password);
    if (user) {
      console.log("Login bem-sucedido:", user);
      
      storageHelper.saveSession(user);
      // Redirecionar ou atualizar a interface conforme necessário
      navigate("/home");
    } else {
      alert("Email ou senha incorretos.");
    }
  };

  return (
    <div className={"authPages"}>
      <div className="container">
        <form onSubmit={handleLogin}>
          <h1>Equipe A - Login</h1>
          <p>Email institucional</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
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
          <a>Esqueci minha senha</a>
          <button type="submit" onSubmit={handleLogin}>Entrar</button>
        </form>
        <p>
          Não tem uma conta? <a href="/register" >Cadastre-se</a>
        </p>
        <p className="footer">
          © 2025 Equipe A - Métodos Ágeis — Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
export default Login;
