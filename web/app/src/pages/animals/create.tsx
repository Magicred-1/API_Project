import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import supabaseDB from '../../utils/supabase/supabaseClient';

export default function CreateAnimal() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [space, setSpace] = useState('');
    const [treatments, setTreatments] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabaseDB.from('animals').insert([
                { name, species, space, treatments: treatments.split(',') },
            ]);

            if (error) {
                setErrorMessage('Error creating animal');
            } else {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/animals');
                }, 2000);
            }
        } catch (error) {
            setErrorMessage('Error creating animal');
        }
    };

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/CreateAnimals.css" />
            </Head>
            <div className="form-container">
                <h1 className="form-title">Create Animal</h1>
                {success && <p className="success-message">Animal created successfully!</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleCreate}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Species:
                        <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} />
                    </label>
                    <label>
                        Space:
                        <input type="text" value={space} onChange={(e) => setSpace(e.target.value)} />
                    </label>
                    <label>
                        Treatments (comma-separated):
                        <input type="text" value={treatments} onChange={(e) => setTreatments(e.target.value)} />
                    </label>
                    <button type="submit">Create</button>
                </form>
            </div>
        </>
    );
}
