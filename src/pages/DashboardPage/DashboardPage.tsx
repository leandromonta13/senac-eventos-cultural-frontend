

import React, { useEffect,useState, type FormEvent } from "react";
import styles from ' ./DashBoardPage.module.css';
import NavBarComponent from "../../components/Navbar/NavBarComponent";
import { useNavigate } from 'react-router';




interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    bannerUrl: string;
    price: number | null;
    createdAt: string;
    subscriptionCount: number;
}






function DashBoardPage () {
    const navgate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const [editing, setEditing] = useState<Event | null>(null);
    const [formData, setFormData] = useState<Partial<Event & { bannerFile?: File }>>({});
    const [modalError, setModalError] = useState<string | null>(null);
    const [Modalsuccess, setModalSuccess] = useState<Boolean>(false);

    const baseUrL = 'https://senac-eventos-cultural-backend-production.up.railway.app';

    const fetchEvents = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${baseUrL}/events/myevents`,{
                headers: { Authorization: `Bearer ${token}`}

            });

            if (!res.ok) throw new Error(`Erro ${res.status}`);
            const data: Event[] = await res.json();
            setEvents(data);

        } catch (err:unknown) {
            if (err instanceof Error) {
                setError(err.message || 'Erro ao buscar eventos');

            } else {
                setError('Erro ao buscar eventos');
            }

        } finally { 
            setLoading(false);

    }
    };

    useEffect(() => {
        fetchEvents();
    },[]);

    const openEditModal = (evt: Event) => {
        setEditing(evt);
        setFormData({
            title: evt.title,
            description: evt.description,
            location: evt.location,
            price: evt.price ?? 0
        });
        setModalError(null);
        setModalSuccess(false);
    };
    const handLeUodate = async (e: FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        setModalError(null);
        setModalSuccess(false);

        const token = localStorage.getItem('token');
        const fd = new FormData();
        fd.append('title', formData.title!);
        fd.append('description', formData.description!);
        fd.append('location', formData.location!);
        fd.append('price', String(formData.price ?? 0));
        if (formData.bannerFile) fd.append('banner', formData.bannerFile);

        try {
            const res =await fetch(`${baseUrL}/events/${editing.id}`, {
                method: 'PUT',
                headers: { Autorization: `Bearer ${token}` },
                body: fd
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || `Erro ${res.status}`);
            }

            setModalSuccess(true);
            fetchEvents();
            setEditing(null);

        } catch (err: unknown) {
            if (err instanceof Error) {
                setModalError(err.message);
            } else {
                setModalError('Erro ao atualizar evento');
            }
            
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Confirmar exclusao deste evento?' )) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${baseUrL}/events/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }

            });
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            fetchEvents();
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message || 'Erro ao apgar evento');
            } else {
                alert('Erro ao apagar evento');
            }
        }
    };
    if (loading) return(
        <div className={styles.container}>
            Carregando Eventos...

        </div>
    )
    return(
        <>
        <NavBarComponent/>
        <div className={styles.container}>
            <h1>Maus Eventos</h1>
            <div className={styles.addButtonContainer}>
                <button className={styles.addButton} onClick={() => navgate('/creat_events')}>
                    + Criar novo evento
                </button>

            </div>
            <table className={styles.table}>
                
            </table>

        </div>


        {editing && (

        )}
        </>
    );
}

return(

)

}

export default DashBoardPage;