import styles from './NavBar.module.css'
import { Link } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

export default function NavBarComponent() {
    const { user, logout } = useAuth()

    return (
     <nav className={styles.menu}>
        <div className={styles.logo}>Logo</div>

        <div className={styles['nav-links']}>
            {user ? (
                <>
                <Link to="/eventos">Eventos</Link>
                {user.role ==='organizer' && (
                    <Link to="/painel-eventos">Painel de Eventos</Link>
                )}
                {/* so chama logaut, sem to="..."*/}
                <button onClick={logout}></button>
            </>
         ) : (
          <>
         <Link to="/login">Login</Link>
         <Link to="/register">Cadastro</Link>
    </>
     )}
</div>
</nav>
)
                
}