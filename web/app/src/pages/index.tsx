import React, { useEffect, useState } from "react";
import Head from "next/head";

const Index = () => {
    const [zoo, setZoo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchZoo();
    }, []);

    const fetchZoo = async () => {
        // route pour récupérer les données de l'API

        const res = await fetch("/api/zoo");
        const data = await res.json();
        setZoo(data);
        setLoading(false);
    };

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="/css/Index.css" />
            </Head>
            <h1>Bienvenue au ZOO de l'ESGI</h1>
            <p className="welcome-text">
                Venez découvrir et apprendre sur les merveilleuses créatures qui habitent notre planète!
                Ici à ZOO de l'ESGI, nous vous offrons une expérience mémorable qui rapproche vous et la nature.
                Avec une variété de différentes attractions, y compris la majestueuse lion de la savane africaine,
                les colorés perroquets de la jungle amazonienne, et plus encore, il y a quelque chose pour tout le monde
                au ZOO de l'ESGI.
            </p>
            <a href="/login" className="login-button">Se connecter</a>
        </div>
    );
};

export default Index;
