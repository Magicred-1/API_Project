import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import supabaseDB from '../../utils/supabase/supabaseClient';

export default function CreateAnimal() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [space, setSpace] = useState('');
    const [treatments, setTreatments] = useState('');
    const [age, setAge] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [spaces, setSpaces] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function loadSpaces() {
            const { data: spacesData, error } = await supabaseDB.supabase
                .from('spaces').select('*');

            if (error) {
                console.error('Error loading spaces', error);
            } else {
                setSpaces(spacesData);
            }
        }

        loadSpaces();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabaseDB.supabase.from('animals').insert([
                { name, species, space_id: space, treatments, age: Number(age) },
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
                <link rel="stylesheet" href="/css/CreateSpace.css" />
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
                        <select value={space} onChange={(e) => setSpace(e.target.value)}>
                            {spaces.map((space) => (
                                <option key={space.id} value={space.id}>
                                    {space.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Treatments:
                        <input type="text" value={treatments} onChange={(e) => setTreatments(e.target.value)} />
                    </label>
                    <label>
                        Age:
                        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {success && <div className="success-message">Animal created successfully! Redirecting...</div>}
            </div>
        </>
    );
}
