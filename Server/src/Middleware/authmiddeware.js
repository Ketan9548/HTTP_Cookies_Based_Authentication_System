import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authmiddeware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default authmiddeware