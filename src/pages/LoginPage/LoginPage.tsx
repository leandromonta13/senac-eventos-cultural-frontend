import React, { useState, type FormEvent } from 'react';
import styles from './LoginPage.module.css';
import { useAuth} from "../../contexts/AuthContext";



const LoginPage: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError (null);
    try {
      const res = await fetch(
        "https://senac-eventos-cultural-backend-production.up.railway.app/auth/login",
      {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ email, password}),

      }

    );
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Falha no login");
    }
    const { token } = await res.json();
    login(token);
    window.location.href = "/";


    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        alert('Erro ao logar: ${err.message}');
        
      } else {
        const errorMsg = String(err);
        setError(errorMsg);
        alert('Erro ao logar: ${errorMsg}');


      }

    }

  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tela de Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>

        {error && <div>{error}</div>}

        <label htmlFor="email" className={styles.label}>
          Email
          </label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          className={styles.input}
          placeholder="Digite seu email"
          required
        />

        <label htmlFor="password" className={styles.label}>
          Senha
          </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          className={styles.input}
          placeholder="Digite sua senha"
          required
        />

        <button type="submit" className={styles.button}>Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
