import jwt from 'jsonwebtoken';

export const authentication = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // const token = authHeader.split(" ")[1];
    // authHeader = "Bearer yourtoken....."
    // [Bearer, yourtoken.....]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
