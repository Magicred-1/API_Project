import React, { useState, useEffect } from 'react';
import supabaseDB from '../../../utils/supabase/supabaseClient';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function UpdateAnimal() {
    const router = useRouter();
    const { id } = router.query;
    const [successMessage, setSuccessMessage] = useState("");
    const [spaces, setSpaces] = useState([]);

    const [animal, setAnimal] = useState(null);


    useEffect(() => {
        async function loadSpaces() {
            const { data: spacesFromDB, error } = await supabaseDB.supabase
                .from('spaces')
                .select('*');

            if (error) console.error('Error loading spaces', error);
            else setSpaces(spacesFromDB);
        }

        loadSpaces();
    }, []);

    useEffect(() => {
        async function loadAnimal() {
            const { data: animals, error } = await supabaseDB.supabase
                .from('animals')
                .select('*')
                .eq('id', id);

            if (error) console.error('Error loading animal', error);
            else setAnimal(animals[0]);
        }

        if (id) loadAnimal();
    }, [id]);

    async function handleUpdate(event) {
        event.preventDefault();
        const { data, error } = await supabaseDB.supabase
            .from('animals')
            .update({
                name: animal.name,
                species: animal.species,
                space_id: animal.space_id,
                treatments: animal.treatments,
                age: animal.age
            })
            .eq('id', id);

        if (error) {
            console.error('There was an error updating the animal:', error);
        } else {
            console.log('Animal updated successfully:', data);
            setSuccessMessage("Animal updated successfully !");
            setTimeout(() => {
                router.push('/animals');
            }, 2000);
        }
    }

    return (
        <div className="form-container">
            <h1 className="form-title">Update Animal</h1>
            <button className="back-button" onClick={() => router.push('/animals')}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <Head>
                <link rel="stylesheet" href="/css/UpdateAnimals.css" />
            </Head>

            <form onSubmit={handleUpdate}>
                {successMessage && <p className="success-message">{successMessage}</p>}
                <label>
                    Name:
                    <input type="text" value={animal?.name || ''} onChange={e => setAnimal({...animal, name: e.target.value})} />
                </label>
                <label>
                    Species:
                    <input type="text" value={animal?.species || ''} onChange={e => setAnimal({...animal, species: e.target.value})} />
                </label>
                <label>
                    Space:
                    <select value={animal?.space_id || ''} onChange={e => setAnimal({...animal, space_id: e.target.value})}>
                        {spaces.map((space) => (
                            <option key={space.id} value={space.id}>
                                {space.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Treatments:
                    <input type="text" value={animal?.treatments || ''} onChange={e => setAnimal({...animal, treatments: e.target.value})} />
                </label>
                <label>
                    Age:
                    <input type="text" value={animal?.age || ''} onChange={e => setAnimal({...animal, age: e.target.value})} />
                </label>

                <button className="submit-button" type="submit">Update</button>
            </form>
        </div>
    );
}
