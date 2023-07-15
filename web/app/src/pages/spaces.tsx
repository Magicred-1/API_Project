import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import supabaseDB from '../utils/supabase/supabaseClient';

const SpacesList = () => {
    const [spaces, setSpaces] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const fetchSpaces = async () => {
        try {
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
                    'upcomingMaintenanceDate');

            if (error) {
                throw error;
            }

            setSpaces(spaces);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };



    const deleteSpace = async (id) => {
        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cette espace ?');
        if (!confirmDelete) {
            return;
        }

        const { error } = await supabaseDB.supabase
            .from('spaces')
            .delete()
            .match({ id });

        if (error) {
            alert(`Erreur lors de la suppression de l\'espace : ${error}`);
        } else {
            setSpaces(spaces.filter(space => space.id !== id));
            setSuccessMessage('Employé supprimé avec succès!');
        }
    };

    const updateSpace = (id) => {
        router.push(`/spaces/update/${id}`);
    };

    const goToSpace = (id) => {
        router.push(`/spaces/${id}`);
    };

    useEffect(() => {
        fetchSpaces();
    }, []);


    useEffect(() => {
        fetchSpaces();
    }, []);

    // Render the component
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/ListSpaces.css" />
            </Head>
            <div className="list-container">
                <h1 className="table-title">List of Spaces</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Capacity</th>
                        <th>Duration</th>
                        <th>Opening Hours</th>
                        <th>Closing Hours</th>
                        <th>Disabled Access</th>
                        <th>Maintenance</th>
                        <th>Upcoming Maintenance Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {spaces.map((space) => (
                        <tr key={space.id}>
                            <td>{space.id}</td>
                            <td>{space.name}</td>
                            <td>{space.description}</td>
                            <td>{space.type}</td>
                            <td>{space.capacity}</td>
                            <td>{space.duration}</td>
                            <td>{space.openingHours}</td>
                            <td>{space.closingHours}</td>
                            <td>
                                {space.disabledAccess ? (
                                    <i className="fas fa-wheelchair"></i>
                                ) : (
                                    <i className="fas fa-times-circle"></i>
                                )}
                            </td>
                            <td>
                                {space.maintenance ? (
                                    <i className="fas fa-wrench"></i>
                                ) : (
                                    <i className="fas fa-times-circle"></i>
                                )}
                            </td>

                            <td>{space.upcomingMaintenanceDate}</td>
                            <td>
                                <div className="button-group">
                                    <button className="update-button" onClick={() => updateSpace(space.id)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className="delete-button" onClick={() => deleteSpace(space.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <button className="view-button" onClick={() => goToSpace(space.id)}>
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SpacesList;
