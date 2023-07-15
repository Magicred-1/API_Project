import React, { useState, useEffect } from 'react';
import supabaseDB from '../../utils/supabase/supabaseClient';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function EspaceProfile() {
    const router = useRouter();
    const { id } = router.query;

    const [space, setSpace] = useState(null);

    useEffect(() => {
        async function loadSpace() {
            const { data: spaces, error } = await supabaseDB.supabase
                .from('spaces')
                .select(
                    'id,\n' +
                    'name,\n' +
                    'description,\n' +
                    'images,\n' +
                    'type,\n' +
                    'capacity,\n' +
                    'duration,\n' +
                    'openingHours,\n' +
                    'closingHours,\n' +
                    'disabledAccess,\n' +
                    'maintenance,\n' +
                    'upcomingMaintenanceDate')
                .eq('id', id);

            if (error) console.error('Erreur lors du chargement du profil de l\'espace', error);
            else setSpace(spaces[0]);
        }

        if (id) loadSpace();
    }, [id]);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/EspaceProfile.css" />
            </Head>
            <div className="profile-container">
                <h1>Description des espaces</h1>
                {space && (
                    <>
                        <h2>{space.name}</h2>
                        <p>Description: {space.description}</p>
                        <p>Type: {space.type}</p>
                        <p>Capacity: {space.capacity}</p>
                        <p>Duration: {space.duration}</p>
                        <p>Opening Hours: {space.openingHours}</p>
                        <p>Closing Hours: {space.closingHours}</p>
                        <p>Disabled Access: {space.disabledAccess ? "Yes" : "No"}</p>
                        <p>Maintenance: {space.maintenance ? "Yes" : "No"}</p>
                        <p>Upcoming Maintenance Date: {space.upcomingMaintenanceDate}</p>
                    </>
                )}
                <button className="back-button" onClick={() => router.push('/spaces')}>
                    <i className="fas fa-arrow-left"></i> Retour à la liste des espaces
                </button>

            </div>
        </>
    );
}
