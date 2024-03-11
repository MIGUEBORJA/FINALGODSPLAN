import jwt from 'jsonwebtoken'
import { config } from 'dotenv';

config()

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "Token no obtenido" });
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token inválido", err });
            } else {
                console.log("Token decodificado:", decoded);

                req.name = decoded.name;
                req.role = decoded.role || 'user';
                next();
            }
        });
    }
};

const checkUserRole = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.role;

        if (userRole === requiredRole) {
            next();
        } else {
            res.status(403).json({ error: 'Acceso denegado. Permiso insuficiente.' });
        }
    };
};

export { verifyUser, checkUserRole };
