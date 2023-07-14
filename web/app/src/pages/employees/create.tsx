import React, { useState } from 'react';
import { useRouter } from 'next/router';
import supabaseDB from '../../utils/supabase/supabaseClient';
import Head from 'next/head';

export default function CreateEmployee() {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [availabilities, setAvailabilities] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const { data, error } = await supabaseDB.supabase
            .from('employees')
            .insert([{ name, role, availabilities }]);

        if (error) {
            console.error(error);
        } else {
            console.log(data);
            setSuccess(true);
            setTimeout(() => {
                router.push('/');
            }, 2000);
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