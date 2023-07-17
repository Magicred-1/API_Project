import React, { useState } from 'react';
import { useRouter } from 'next/router';
import supabaseDB from '../../utils/supabase/supabaseClient';
import Head from 'next/head';

export default function CreateSpace() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [capacity, setCapacity] = useState('');
    const [duration, setDuration] = useState('');
    const [openingHours, setOpeningHours] = useState<string[]>([]);
    const [closingHours, setClosingHours] = useState<string[]>([]);
    const [disabledAccess, setDisabledAccess] = useState(false);
    const [maintenance, setMaintenance] = useState(false);
    const [upcomingMaintenanceDate, setUpcomingMaintenanceDate] = useState<string[]>([]);

    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const { data, error } = await supabaseDB.supabase
            .from('spaces')
            .insert([{
                name,
                description,
                type,
                capacity,
                duration,
                openingHours,
                closingHours,
                disabledAccess,
                maintenance,
                upcomingMaintenanceDate
            }]);

        if (error) {
            console.error(error);
        } else {
            console.log(data);
            setSuccess(true);
            setTimeout(() => {
                router.push('/spaces');
            }, 2000);
        }
    }

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/CreateSpace.css" />
            </Head>
            <div className="form-container">
                <h1 className="form-title">Créer un espace</h1>
                {success && <p className="success-message">Espace créé avec succès!</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Nom:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>
                        Type:
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                    </label>
                    <label>
                        Capacité:
                        <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                    </label>
                    <label>
                        Durée:
                        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </label>
                    <label>
                        Heures douverture:
                        <input type="text" value={openingHours} onChange={(e) => setOpeningHours(e.target.value.split(','))} />
                    </label>
                    <label>
                        Heures de fermeture:
                        <input type="text" value={closingHours} onChange={(e) => setClosingHours(e.target.value.split(','))} />
                    </label>
                    <label>
                        Accès handicapés:
                        <input type="checkbox" checked={disabledAccess} onChange={(e) => setDisabledAccess(e.target.checked)} />
                    </label>
                    <label>
                        Maintenance:
                        <input type="checkbox" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} />
                    </label>
                    <label>
                        Prochaine date de maintenance:
                        <input type="text" value={upcomingMaintenanceDate} onChange={(e) => setUpcomingMaintenanceDate(e.target.value.split(','))} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {success && <div className="success-message">Espace créé avec succès! Redirection...</div>}
            </div>
        </>
    );
}
