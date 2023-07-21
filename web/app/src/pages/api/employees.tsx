import { NextApiRequest, NextApiResponse } from 'next';
import argon2 from 'argon2';
import supabaseDB from '../../utils/supabase/supabaseClient';
import { CustomRequest } from '../../utils/tokenAuthenfication/authMiddleware';

// Reste du code


export default async function handler(req: CustomRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }

    try {
        const { name, role, password, isAdmin, availabilities } = req.body;

        const hashedPassword = await argon2.hash(password);

        // Vérifier si l'utilisateur est un administrateur
        if (isAdmin) {
            // Effectuer les opérations CRUD pour l'administrateur
            // Exemple : Insérer l'employé dans la base de données
            const { data, error } = await supabaseDB.supabase
                .from('employees')
                .insert([
                    {
                        name,
                        role,
                        password: hashedPassword,
                        isAdmin,
                        availabilities
                    }
                ]);

            if (error) {
                console.error('Erreur de base de données :', error);
                return res.status(500).json({ message: 'Impossible de créer l\'employé' });
            }

            return res.status(200).json({ data });
        } else {
            // L'utilisateur n'est pas un administrateur, il ne peut que lire
            return res.status(403).json({ message: 'Non autorisé' });
        }
    } catch (error) {
        console.error('Erreur non gérée :', error);
        return res.status(500).json({ message: 'Erreur inattendue' });
    }
}

