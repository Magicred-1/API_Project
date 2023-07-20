import React, { useState } from 'react';
import { useRouter } from 'next/router';
import supabaseDB from '../../utils/supabase/supabaseClient';
import Head from 'next/head';
import {isValid} from "zod";
import {getDefaultResultOrder} from "dns";

const CreateTicket = () => {
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [valid, setValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        try {
            const { error } = await supabaseDB.supabase
                .from('tickets')
                .insert([{ type, price, valid }]);

            if (error) {
                setErrorMessage('Error creating ticket');
            } else {
                setSuccess(true);
                router.push('/tickets');
            }
        } catch (error) {
            setErrorMessage('Error creating ticket');
        }
    };

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/CreateTickets.css" />
            </Head>
            <div className="form-container">
                <h1 className="form-title">Create a Ticket</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {success && <p className="success-message">Espace créé avec succès!</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Type:
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                    </label>
                    <label>
                        Price:
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <label>
                        valid:
                        <input type="checkbox" checked={valid} onChange={(e) => setValid(e.target.checked)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    );
};

export default CreateTicket;
