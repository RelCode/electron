const jwt = require('jsonwebtoken');
const keywords = require('./keywords');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: keywords.noToken });
    }
    
    try {
        const decoded = jwt.decode(token.replace('Bearer ',''), process.env.SECRET_KEY);
        req.userID = decoded.userID;
        next();
    } catch (error) {
        res.status(401).json({ message: keywords.invalidToken });
    }
}

module.exports = verifyToken;