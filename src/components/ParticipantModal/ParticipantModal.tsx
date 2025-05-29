import  { useEffect, useState } from 'react';
import styles from  './ParticipantModal.module.css'; 
type Participant = {
  subscriptionId: number;
  userId: number;
  name: string;
  email: string;
  subscribedAt: string;
};

interface ParticipantModalProps {
  eventId: number;
  onClose: () => void;
}

export default function ParticipantModal({ eventId, onClose }: ParticipantModalProps) {
  const [participant, setParticipant] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = 'https://senac-eventos-cultural-backend-production.up.railway.app';

  useEffect(() => {
    async function fetchParticipant() {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${baseUrl}/events/${eventId}/subscriptions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        const data: Participant[] = await res.json();
        setParticipant(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro ao buscar participante');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchParticipant();
  }, [eventId]);

  return (
    <div className={styles.pmOverlay}>
      <div className={styles.pmModal}>
        <button className={styles.pmClose} onClick={onClose}>×</button>
        <h2>Participant</h2>

        {loading && <p>Carregando...</p>}
        {error && <p className={styles.pmError}>{error}</p>}

        {!loading && !error && (
          <ul className={styles.pmList}>
            {participant.map(p => (
              <li key={p.subscriptionId} className={styles.pmItem}>
                <strong>{p.name}</strong> ({p.email})<br/>
                Inscrito em: {new Date(p.subscribedAt).toLocaleString()}
              </li>
            ))}
            {participant.length === 0 && (
              <li className={styles.pmItem}>Nenhum inscrito ainda.</li>
            )}
          </ul>
        )}
      </div>
    </div>
);
}