import React, { useState, useEffect } from 'react';
import supabaseDB from '../../utils/supabase/supabaseClient';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function EmployeeProfile() {
    const router = useRouter();
    const { id } = router.query;

    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        async function loadEmployee() {
            const { data: employees, error } = await supabaseDB.supabase
                .from('employees')
                .select('*')
                .eq('id', id);

            if (error) console.error('Erreur lors du chargement du profil de l\'employé', error);
            else setEmployee(employees[0]);
        }

        if (id) loadEmployee();
    }, [id]);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/EmployeeProfile.css" />
            </Head>
            <div className="profile-container">
                <h1>Profil de l'Employé</h1>
                {employee && (
                    <>
                        <h2>{employee.name}</h2>
                        <p>Rôle: {employee.role}</p>
                        <p>Disponibilités: {employee.availabilities.join(', ')}</p>
                    </>
                )}
                <button className="back-button" onClick={() => router.push('/employees')}>
                    <i className="fas fa-arrow-left"></i> Retour à la liste des employés
                </button>

            </div>
        </>
    );
}
