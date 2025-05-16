import React, { useState, type FormEvent } from 'react';
import styles from './RegisterPage.module.css';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponet';



interface RegisterProps {
  onRegisterSuccess?: () => void;

}

const RegisterPage: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {



  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'PARTICIPANT' | 'ORGANIZER'>('PARTICIPANT');
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('https://senac-eventos-cultural-backend-production.up.railway.app/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Falha no registro');

      }
      alert('Cadastro realizado com sucesso!');
      onRegisterSuccess?.();
      window.location.href = '/login';


    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      alert(`Erro ao registrar: ${msg}`);
    }
  };


  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.title}>Registrar Usuário</h1>

        {
          error && <div className={styles.error}>{error}</div>
        }

        <div className={styles.formGroup}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="Password">Senha</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>


        <div className={styles.formGroup}>
          <label htmlFor="type">Tipo:</label>
          <select
            id="role"
            value={role}
            className={styles.select}
            onChange={(e) => setRole(e.target.value as 'PARTICIPANT' | 'ORGANIZER')}
          >
            <option value="PARTICIPANT">Participante</option>
            <option value="ORGANIZER">Organizador</option>
          </select>
        </div>

        <button type='submit'>Registrar</button>
      </form>

    </div>
  );

}
export default RegisterPage;
