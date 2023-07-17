import React, { useState, useEffect } from 'react';
import supabaseDB from '../utils/supabase/supabaseClient';
import Head from 'next/head';
import router from 'next/router';

// Crée le composant Employés
export default function Animals(message?: any) {
    // Utilise le hook d'état pour gérer la liste des employés
    const [animals, setAnimals] = useState([]);
    // Hook d'état pour le message de succès
    const [successMessage, setSuccessMessage] = useState('');



    // Utilise le hook d'effet pour charger les employés lorsque le composant est monté
    useEffect(() => {
        // Défini une fonction asynchrone pour charger les employés
        async function fetchAnimals() {
            // Utilise Supabase pour charger les employés
            const { data: animals, error } = await supabaseDB.supabase
                .from('animals')
                .select('id, space_id, created_at, name, species, treatments, age')
                .order('id', { ascending: true });


            // Si il y a une erreur, affiche-la dans la console
            if (error) {
                console.error(error);
            } else {
                // Sinon, mets à jour l'état avec les employés chargés
                setAnimals(animals);
            }
        }

        // Appelle la fonction pour charger les employés
        fetchAnimals();
    }, []);

    // Fonction pour supprimer un employé
    async function deleteEAnimals(id) {
        // Affiche une boîte de dialogue de confirmation avant de supprimer
        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cet animal ?');
        if (!confirmDelete) {
            return;  // Si l'utilisateur annule, arrête la fonction ici
        }

        const { error } = await supabaseDB.supabase
            .from('animals')
            .delete()
            .match({ 'id': id });

        if (error) {
            alert(`Erreur lors de la suppression de l\'animal : ${error}`);
        }
        else {
            // Mettre à jour la liste des animals après la suppression
            setAnimals(animals.filter(animals => animals.id !== id));
            // Mise à jour du message de succès
            setSuccessMessage('Animal supprimé avec succès!');
        }
    }

    function updateAnimals(id) {
        window.location.href = `/animals/update/${id}`;
    }

    function viewAnimals(id) {
        router.push(`/animals/${id}`);
    }

// Rend le composant
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/ListAnimals.css" />
            </Head>
            <div className="list-container">
                <h1 className="table-title">Liste des animaux</h1>
                {successMessage && <p className="success-message">{successMessage}</p>}
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>space_id</th>
                        <th>species</th>
                        <th>treatments</th>
                        <th>age</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {animals.map((animals) => (
                        <tr key={animals.id}>
                            <td>{animals.id}</td>
                            <td>{animals.name}</td>
                            <td>{animals.space_id}</td>
                            <td>{animals.species}</td>
                            <td>{animals.treatments}</td>
                            <td>{animals.age}</td>
                            <td>
                                <button className="update-button" onClick={() => updateAnimals(animals.id)}>
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="delete-button" onClick={() => deleteEAnimals(animals.id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                                <button className="view-button" onClick={() => viewAnimals(animals.id)}>
                                    <i className="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
                <div>
                    <button className="add-button" onClick={() => router.push('/animals/create')}>
                        <span>Add a animal</span>
                    </button>
                </div>
            </div>
        </>
    );
}

