import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  isAdmin: boolean;
  // Otros campos del token si los hay
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    // Si el usuario no es un administrador, restringir el acceso a las rutas de administrador
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }
}
