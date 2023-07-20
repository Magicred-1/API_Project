import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import supabaseDB from '../utils/supabase/supabaseClient';

const TicketsList = () => {
    const [tickets, setTickets] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const { data: tickets, error } = await supabaseDB.supabase
                .from('tickets')
                .select('*')
                .order('id', { ascending: true });
            if (error) {
                setErrorMessage('Error fetching tickets');
            } else {
                console.log(tickets);
                setTickets(tickets);
            }
        } catch (error) {
            setErrorMessage('Error fetching tickets');
        }
    };


    const deleteTicket = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this ticket?');
        if (!confirmDelete) {
            return;
        }

        try {
            await supabaseDB.supabase.from('tickets').delete().match({ id });
            setTickets(tickets.filter((ticket) => ticket.id !== id));
            setSuccessMessage('Ticket deleted successfully!');
        } catch (error) {
            setErrorMessage('Error deleting ticket');
        }
    };

    const updateTicket = (id) => {
        router.push(`/tickets/update/${id}`);
    };

    const goToTicket = (id) => {
        router.push(`/tickets/${id}`);
    };

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/TicketsList.css" />
            </Head>
            <div className="list-container">
                <h1 className="table-title">List of Tickets</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Valid</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.type}</td>
                            <td>{ticket.price}</td>
                            <td>{ticket.valid ? 'Yes' : 'No'}</td>
                            <td>
                                <div className="button-group">
                                    <button className="update-button" onClick={() => updateTicket(ticket.id)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className="delete-button" onClick={() => deleteTicket(ticket.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <button className="view-button" onClick={() => goToTicket(ticket.id)}>
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                    <button className="add-button" onClick={() => router.push('/tickets/create')}>
                        <span>Add a Ticket</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default TicketsList;
