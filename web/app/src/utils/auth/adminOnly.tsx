import { Request, Response } from 'express';
import { authenticate } from './auth';

export function adminOnly(req: Request, res: Response) {
    const user = authenticate(req, res);

    if (!user) {
        return false;
    }

    if (!user.isAdmin) {
        res.status(403).json({ message: 'Admin privileges required.' });
        return false;
    }

    return true;
}
