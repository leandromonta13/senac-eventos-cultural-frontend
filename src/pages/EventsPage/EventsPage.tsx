import React, { useState } from 'react';
import styles from './EventsPage.module.css';

const EventsPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [events, setEvents] = useState([
    { id: 1, title: 'Oficina de Teatro', date: '10/05/2025' },
    { id: 2, title: 'Mostra de Cinema Brasileiro', date: '12/05/2025' },
  ]);

  const handleAddEvent = () => {
    if (newTitle.trim() && newDate.trim()) {
      const newEvent = {
        id: events.length + 1,
        title: newTitle,
        date: newDate,
      };
      setEvents([...events, newEvent]);
      setNewTitle('');
      setNewDate('');
    }
  };

  return (
    <div className={styles.eventsContainer}>
      <header className={styles.header}>
        <h1>Events</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.userInfoRow}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Nome do Usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="contact">Contato:</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="(xx) xxxxx-xxxx"
            />
          </div>
        </div>

        <div className={styles.eventForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="newTitle">Título do Evento:</label>
            <input
              type="text"
              id="newTitle"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Digite o título do evento"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="newDate">Data do Evento:</label>
            <input
              type="date"
              id="newDate"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </div>

          <button onClick={handleAddEvent}>Adicionar Evento</button>
        </div>

        <div className={styles.eventList}>
          {events.map((event) => (
            <div key={event.id} className={styles.eventItem}>
              <strong>{event.title}</strong> - {event.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
