import React, { useState, useEffect } from 'react';
import supabaseDB from '../utils/supabase/supabaseClient';
import Head from 'next/head';
import router from 'next/router';

// Crée le composant Employés
export default function Employees(message?: any) {
    // Utilise le hook d'état pour gérer la liste des employés
    const [employees, setEmployees] = useState([]);
    // Hook d'état pour le message de succès
    const [successMessage, setSuccessMessage] = useState('');



    // Utilise le hook d'effet pour charger les employés lorsque le composant est monté
    useEffect(() => {
        // Défini une fonction asynchrone pour charger les employés
        async function fetchEmployees() {
            // Utilise Supabase pour charger les employés
            const { data: employees, error } = await supabaseDB.supabase
                .from('employees')
                .select('*')
                .order('id', { ascending: true });


            // Si il y a une erreur, affiche-la dans la console
            if (error) {
                console.error(error);
            } else {
                // Sinon, mets à jour l'état avec les employés chargés
                setEmployees(employees);
            }
        }

        // Appelle la fonction pour charger les employés
        fetchEmployees();
    }, []);

    // Fonction pour supprimer un employé
    async function deleteEmployee(id) {
        // Affiche une boîte de dialogue de confirmation avant de supprimer
        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cet employé ?');
        if (!confirmDelete) {
            return;  // Si l'utilisateur annule, arrête la fonction ici
        }

        const { error } = await supabaseDB.supabase
            .from('employees')
            .delete()
            .match({ 'id': id });

        if (error) {
            alert(`Erreur lors de la suppression de l\'employé : ${error}`);
        }
        else {
            // Mettre à jour la liste des employés après la suppression
            setEmployees(employees.filter(employee => employee.id !== id));
            // Mise à jour du message de succès
            setSuccessMessage('Employé supprimé avec succès!');
        }
    }

    function updateEmployee(id) {
        // Redirige al usuario a la página de actualización para este empleado
        window.location.href = `/employees/update/${id}`;
    }

    function viewEmployee(id) {
        router.push(`/employees/${id}`);
    }

// Rend le composant
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/ListEmployees.css" />
            </Head>
            <div className="list-container">
                <h1 className="table-title">Liste des Employés</h1>
                {successMessage && <p className="success-message">{successMessage}</p>}
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Rôle</th>
                        <th>Disponibilité</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.role}</td>
                            <td>{employee.availabilities ? employee.availabilities : 'Pas dispo'}</td>
                            <td>
                                <button className="update-button" onClick={() => updateEmployee(employee.id)}>
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="delete-button" onClick={() => deleteEmployee(employee.id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                                <button className="view-button" onClick={() => viewEmployee(employee.id)}>
                                    <i className="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

