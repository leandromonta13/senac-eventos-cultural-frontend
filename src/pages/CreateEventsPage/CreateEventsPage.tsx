import React, { useState, type FormEvent } from "react";
import styles from " ./CreateEventsPage.module.css";
import NavBarComponent from "../../components/Navbar/NavBarComponent";

export default function CreateEventsPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState ("");
    const [price, setPrice] = useState<number>(0);
    const [bannerFile, setBannerfile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, SetSuccess] = useState<boolean>(false);


    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    SetSuccess(false);

    if (!bannerFile) {
        setError("Voce precisa escolher um arquivo de banner.");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("price", String(price));
    formData.append("banner", bannerFile);

    const token = localStorage.getItem("token");
    if (!token) {
        setError("Usuario nao autenticado.");
        return;
    }

    try {
    const res = await fetch(
        "https://senac-eventos-cultural-beckend-production.up.railway.app/eventes",
    {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,

        },
        body: formData,
    }
    );

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `Erro &{res.status}`);

    }

    SetSuccess(true);
    // opcional: limpar o form
    setTitle("");
    setDescription("");
    setLocation("");
    setPrice(0);
    setBannerfile(null);
    
    } catch (err: unknown) {
        const msg = err instanceof Error? err.message : String(err);
        setError(msg);

    }

    };



    return (
        <>
            <NavBarComponent />
            <div>
                <h1>Criar Evento</h1>
            {error && <div>{error}</div>}  
            {success && (
                <div>Evento criado com sucesso!</div>
            )}  

            <form onSubmit={handleSubmit}>
                
            </form>

            </div>
            </>
            

    );
}
