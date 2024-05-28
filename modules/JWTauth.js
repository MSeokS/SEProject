const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config({path:path.resolve(__dirname, '../.env')});

login = async (req, res, next) => {
    try {
        const payload = await jwt.verify(req.cookies.user, process.env.KEY);
        return res.status(400).json({
            message: 'Already signed in.'
        });
    }
    catch (error) {
        next();
    }
}

auth = async (req, res, next) => {
    try {
        const payload = await jwt.verify(req.cookies.user, process.env.KEY);
        req.body.id = payload.id;
        return next();
    }
    catch (error) {
        if(error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token has been expired.'
            });
        } else if(error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token.'
            });
        } else {
            return res.status(401).json({
                message: 'Cannot find token.'
            });
        }
    }
}

module.exports = {login, auth};
