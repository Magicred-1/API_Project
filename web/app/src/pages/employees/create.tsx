import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';

export default function CreateEmployee() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [availabilities, setAvailabilities] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const response = await axios.post('/api/employees', {
            name,
            role,
            password,
            isAdmin,
            availabilities,
        });

        if (response.status === 200) {
            setSuccess(true);
            setTimeout(() => {
                router.push('/employees');
            }, 2000);
        } else {
            console.error(response.data);
        }
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/CreateEmployee.css" />
            </Head>
            <div className="form-container">
                <h1 className="form-title">Créer un employée</h1>
                {success && <p className="success-message">Employée créé avec succès!</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Role:
                        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <label>
                        Is Admin:
                        <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                    </label>
                    <label>
                        Availabilities:
                        <input type="text" value={availabilities} onChange={(e) => setAvailabilities([e.target.value])} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {success && <div className="success-message">Employée créé avec succès! Redirection...</div>}
            </div>
        </>
    );
}
