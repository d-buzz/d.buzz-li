const jwt = require('jsonwebtoken');
const config = require('./../config/app');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.json({ message: 'Invalid token. Please login first!', status: 400 })
    }
    try {
        const decoded = jwt.verify(token, config.HASH_SECRET);
        if(decoded){
            return next();
        }else{
            return res.json({ message: 'Invalid token. Please login first!', status: 400 })
        }
    } catch(error) {
        return res.json({ message: error.message, status: 400 })
    }
}
