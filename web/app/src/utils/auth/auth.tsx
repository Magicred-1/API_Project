import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response) {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(403).json({ message: 'No token provided.' });
        return null;
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        res.status(500).json({ message: 'Failed to authenticate token.' });
        return null;
    }

    return decodedToken;
}
