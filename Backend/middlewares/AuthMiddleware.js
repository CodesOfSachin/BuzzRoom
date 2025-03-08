import jwt from 'jsonwebtoken';

export const verifyToken = (request, response, next) => {
    try {
        
        const token = request?.cookies?.jwt;

        if (!token) {
            return response.status(401).json({ message: "You are not authorized!" });
        }

        jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
            if (err) {
                return response.status(403).json({ message: "Invalid Token" });
            }

            request.userId = payload.userId;
            next();
        });
    } catch (error) {
        console.error("Token Verification Error:", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
};
