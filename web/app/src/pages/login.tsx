import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from "next/head";

function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/login', { name, password });
            localStorage.setItem('token', response.data.token);

            router.push('/employees');
        } catch (error) {
            setError("Nom ou mot de passe invalide");
        }
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/LoginPage.css" />
            </Head>

            <div className="form-container">
                <h1 className="form-title">Se connecter</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nom:
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        Mot de passe:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="submit-button">Se connecter</button>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
