import styles from './EventsPage.module.css';



export default function EventsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Senac Eventos Cultural</div>
        <nav className={styles.nav}>
          <a className={styles.navItem} href="#">Eventos</a>
          <a className={styles.navItem} href="#">Meus Eventos</a>
        </nav>
      </header>

      <h1 className={styles.title}>Eventos</h1>

      <div className={styles.cards}>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.image}></div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>Event Title</h2>
              <p className={styles.location}>Localização</p>
              <button className={styles.button}>Inscrever-se</button>
              <p className={styles.contact}>Contactar organizador</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

