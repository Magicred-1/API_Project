import React, { useState, useEffect } from 'react';
import supabaseDB from '../../../utils/supabase/supabaseClient';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function UpdateEmployee() {
    const router = useRouter();
    const { id } = router.query;
    const [successMessage, setSuccessMessage] = useState("");

    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        async function loadEmployee() {
            const { data: employees, error } = await supabaseDB.supabase
                .from('employees')
                .select('*')
                .eq('id', id);

            if (error) console.error('Error loading employee', error);
            else setEmployee(employees[0]);
        }

        if (id) loadEmployee();
    }, [id]);

    async function handleUpdate(event) {
        event.preventDefault();
        const { data, error } = await supabaseDB.supabase
            .from('employees')
            .update({
                name: employee.name,
                role: employee.role,
                availabilities: employee.availabilities
            })
            .eq('id', id);

        if (error) {
            console.error('There was an error updating the employee:', error);
        } else {
            console.log('Employee updated successfully:', data);
            setSuccessMessage("Employee updated successfully !");
            setTimeout(() => {
                router.push('/employees');
            }, 2000);
        }
    }

    return (
        <div className="form-container">
            <h1 className="form-title">Update Employée</h1>
            <Head>
                <link rel="stylesheet" href="/css/UpdateEmployee.css" />
            </Head>

            <form onSubmit={handleUpdate}>
                {successMessage && <p className="success-message">{successMessage}</p>}
                <input type="text" value={employee?.name || ''} onChange={e => setEmployee({...employee, name: e.target.value})} />
                <input type="text" value={employee?.role || ''} onChange={e => setEmployee({...employee, role: e.target.value})} />
                <input type="text" value={employee?.availabilities || ''} onChange={e => setEmployee({...employee, availabilities: [e.target.value]})} />

                <button className="submit-button" type="submit">Update</button>
            </form>
        </div>
    );
}
