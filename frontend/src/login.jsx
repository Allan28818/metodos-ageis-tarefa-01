import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="container">
        <form>
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
          <button type="submit">Entrar</button>
        </form>
        <p>
          Não tem uma conta? <a href="#">Cadastre-se</a>
        </p>
      </div>
    </>
  );
}
export default Login;
