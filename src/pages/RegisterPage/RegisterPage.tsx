import React, { useState } from 'react';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('participante');

  const handleRegister = () => {
    alert(`Usuário registrado:\nNome: ${name}\nEmail: ${email}\nTipo: ${type}`);
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.title}>Registrar Usuário</h1>

      <div className={styles.formGroup}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="participante">Participante</option>
          <option value="organizador">Organizador</option>
        </select>
      </div>

      <button className={styles.registerButton} onClick={handleRegister}>
        Registrar Usuário
      </button>
    </div>
  );
};

export default RegisterPage;
