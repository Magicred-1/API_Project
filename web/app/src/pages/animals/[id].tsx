import React, { useState, useEffect } from 'react';
import supabaseDB from '../../utils/supabase/supabaseClient';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AnimalProfile() {
    const router = useRouter();
    const { id } = router.query;

    const [animal, setAnimal] = useState(null);
    const [space, setSpace] = useState(null);

    useEffect(() => {
        async function loadAnimal() {
            const { data: animals, error } = await supabaseDB.supabase
                .from('animals').select('*').eq('id', id);

            if (error) {
                console.error('Error loading animal profile', error);
            } else {
                setAnimal(animals[0]);

                // Load space data
                const { data: spaces, error: spaceError } = await supabaseDB.supabase
                    .from('spaces').select('*').eq('id', animals[0].space_id);

                if (spaceError) {
                    console.error('Error loading space data', spaceError);
                } else {
                    setSpace(spaces[0]);
                }
            }
        }

        if (id) {
            loadAnimal();
        }
    }, [id]);


    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/AnimalProfile.css" />
            </Head>
            <div className="profile-container">
                <h1>Profil de l'Animal</h1>
                {animal && (
                    <>
                        <h2>{animal.name}</h2>
                        <p>Species: {animal.species}</p>
                        <p>Traitements: {animal.treatments}</p>
                        <p>Espace: {space ? space.name : "Loading..."}</p>
                        <p>Âge: {animal.age}</p>
                    </>
                )}
                <button className="back-button" onClick={() => router.push('/animals')}>
                    <i className="fas fa-arrow-left"></i> Retour à la liste des animaux
                </button>
            </div>
        </>
    );
}
