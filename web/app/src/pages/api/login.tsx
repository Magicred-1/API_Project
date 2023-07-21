import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import supabaseDB from '../../utils/supabase/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, password } = req.body;

    const { data: user, error } = await supabaseDB.supabase
        .from('employees')
        .select('*')
        .eq('name', name)
        .single();

    if (error || !user) {
        return res.status(401).json({ message: 'Invalid name or password' });
    }

    const passwordMatch = await argon2.verify(user.password, password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid name or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

    return res.status(200).json({ token });
}
