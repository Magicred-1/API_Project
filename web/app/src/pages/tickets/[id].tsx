import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import supabaseDB from '../../utils/supabase/supabaseClient';

const TicketProfile = () => {
    const router = useRouter();
    const { id } = router.query;

    const [ticket, setTicket] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchTicket();
    }, [id]);

    const fetchTicket = async () => {
        try {
            const { data, error } = await supabaseDB.supabase
                .from('tickets').select('*').eq('id', id).single();
            if (error) {
                setErrorMessage('Error fetching ticket');
            } else {
                setTicket(data);
            }
        } catch (error) {
            setErrorMessage('Error fetching ticket');
        }
    };

    const deleteTicket = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this ticket?');
        if (!confirmDelete) {
            return;
        }

        try {
            await supabaseDB.supabase.from('tickets').delete().match({ id });
            router.push('/tickets');
        } catch (error) {
            setErrorMessage('Error deleting ticket');
        }
    };

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/TicketsProfile.css" />
            </Head>
            <div className="profile-container">
                <h1>Ticket Profile</h1>
                {ticket && (
                    <>
                        <h2>ID: {ticket.id}</h2>
                        <p>Type: {ticket.type}</p>
                        <p>Price: {ticket.price}</p>
                        <p>Valid: {ticket.valid ? 'Yes' : 'No' }</p>
                    </>
                )}
                <button className="back-button" onClick={() => router.push('/tickets')}>
                    <i className="fas fa-arrow-left"></i> Retour à la liste des espaces
                </button>
            </div>
        </>
    );
};

export default TicketProfile;
