module.exports = (rolesPermitidos = []) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado.' });
        }

        if (!rolesPermitidos.includes(req.user.role_id)) {
            return res.status(403).json({ message: 'Acceso denegado.' });
        }

        next();
    };
};
