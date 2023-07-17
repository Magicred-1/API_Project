import React, { useState, useEffect } from 'react';
import supabaseDB from '../../../utils/supabase/supabaseClient';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function UpdateSpace() {
    const router = useRouter();
    const { id } = router.query;
    const [successMessage, setSuccessMessage] = useState("");

    const [space, setSpace] = useState(null);

    useEffect(() => {
        async function loadSpace() {
            const { data: spaces, error } = await supabaseDB.supabase
                .from('spaces')
                .select('*')
                .eq('id', id);

            if (error) console.error('Error loading space', error);
            else setSpace(spaces[0]);
        }

        if (id) loadSpace();
    }, [id]);

    async function handleUpdate(event) {
        event.preventDefault();
        const { data, error } = await supabaseDB.supabase
            .from('spaces')
            .update({
                name: space.name,
                description: space.description,
                type: space.type,
                capacity: space.capacity,
                duration: space.duration,
                openingHours: space.openingHours,
                closingHours: space.closingHours,
                disabledAccess: space.disabledAccess,
                maintenance: space.maintenance,
                upcomingMaintenanceDate: space.upcomingMaintenanceDate
            })
            .eq('id', id);

        if (error) {
            console.error('There was an error updating the space:', error);
        } else {
            console.log('Space updated successfully:', data);
            setSuccessMessage("Space updated successfully!");
            setTimeout(() => {
                router.push('/spaces');
            }, 2000);
        }
    }

    return (
        <div className="form-container">
            <h1 className="form-title">Update Space</h1>
            <button className="back-button" onClick={() => router.push('/spaces')}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <Head>
                <link rel="stylesheet" href="/css/UpdateSpace.css" />
            </Head>
            <form onSubmit={handleUpdate}>
                {successMessage && <p className="success-message">{successMessage}</p>}

                <label htmlFor="name">Name:
                <input type="text" id="name" value={space?.name || ''} onChange={e => setSpace({...space, name: e.target.value})} />
                </label>
                <label htmlFor="description">Description:
                <input type="text" id="description" value={space?.description || ''} onChange={e => setSpace({...space, description: e.target.value})} />
                </label>
                <label htmlFor="type">Type:
                <input type="text" id="type" value={space?.type || ''} onChange={e => setSpace({...space, type: e.target.value})} />
                </label>
                <label htmlFor="capacity">Capacity:
                <input type="text" id="capacity" value={space?.capacity || ''} onChange={e => setSpace({...space, capacity: e.target.value})} />
                </label>
                <label htmlFor="duration">Duration:
                <input type="text" id="duration" value={space?.duration || ''} onChange={e => setSpace({...space, duration: e.target.value})} />
                </label>
                <label htmlFor="openingHours">Opening Hours:
                <input type="text" id="openingHours" value={space?.openingHours || ''} onChange={e => setSpace({...space, openingHours: e.target.value.split(',')})} />
                </label>
                <label htmlFor="closingHours">Closing Hours:
                <input type="text" id="closingHours" value={space?.closingHours || ''} onChange={e => setSpace({...space, closingHours: e.target.value.split(',')})} />
                </label>
                <label htmlFor="disabledAccess">
                    Accès handicapés:
                    <input type="checkbox" id="disabledAccess" checked={space?.disabledAccess || false} onChange={e => setSpace({...space, disabledAccess: e.target.checked})} />
                </label>

                <label htmlFor="maintenance">
                    Maintenance:
                    <input type="checkbox" id="maintenance" checked={space?.maintenance || false} onChange={e => setSpace({...space, maintenance: e.target.checked})} />
                </label>

                <label htmlFor="upcomingMaintenanceDate">Upcoming Maintenance Date:
                <input type="text" id="upcomingMaintenanceDate" value={space?.upcomingMaintenanceDate || ''} onChange={e => setSpace({...space, upcomingMaintenanceDate: e.target.value.split(',')})} />
                </label>
                <button className="submit-button" type="submit">Update</button>
            </form>
        </div>
    );
}
