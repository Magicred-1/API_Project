import React, { useState, useEffect } from 'react';
import supabaseDB from '../../../utils/supabase/supabaseClient';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function UpdateTicket() {
    const router = useRouter();
    const { id } = router.query;
    const [successMessage, setSuccessMessage] = useState("");

    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        async function loadTicket() {
            const { data: tickets, error } = await supabaseDB.supabase
                .from('tickets')
                .select('*')
                .eq('id', id);

            if (error) console.error('Error loading ticket', error);
            else setTicket(tickets[0]);
        }

        if (id) loadTicket();
    }, [id]);

    async function handleUpdate(event) {
        event.preventDefault();
        const { data, error } = await supabaseDB.supabase
            .from('tickets')
            .update({
                type: ticket.type,
                price: ticket.price,
                valid: ticket.valid
            })
            .eq('id', id);

        if (error) {
            console.error('There was an error updating the ticket:', error);
        } else {
            console.log('Ticket updated successfully:', data);
            setSuccessMessage("Ticket updated successfully!");
            setTimeout(() => {
                router.push('/tickets');
            }, 2000);
        }
    }

    return (
        <div className="form-container">
            <h1 className="form-title">Update Ticket</h1>
            <button className="back-button" onClick={() => router.push('/tickets')}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <Head>
                <link rel="stylesheet" href="/css/UpdateTicket.css" />
            </Head>
            <form onSubmit={handleUpdate}>
                {successMessage && <p className="success-message">{successMessage}</p>}

                <label htmlFor="type">Type:
                    <input type="text" id="type" value={ticket?.type || ''} onChange={e => setTicket({...ticket, type: e.target.value})} />
                </label>
                <label htmlFor="price">Price:
                    <input type="text" id="price" value={ticket?.price || ''} onChange={e => setTicket({...ticket, price: e.target.value})} />
                </label>
                <label htmlFor="valid">
                    Valid:
                    <input type="checkbox" id="valid" checked={ticket?.valid || false} onChange={e => setTicket({...ticket, valid: e.target.checked})} />
                </label>

                <button className="submit-button" type="submit">Update</button>
            </form>
        </div>
    );
}
