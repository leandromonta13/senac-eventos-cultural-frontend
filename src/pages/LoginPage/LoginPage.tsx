import React from 'react';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação
    console.log("Formulário enviado");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tela de Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          placeholder="Digite seu email"
          required
        />

        <label htmlFor="password" className={styles.label}>Senha</label>
        <input
          type="password"
          id="password"
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
