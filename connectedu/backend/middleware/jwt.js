const jwt = require('jsonwebtoken');
const { createError } = require('../utils/createError.js');

const verifyToken = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.accessToken;

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        
        if (err) return next(createError(403, "Token is not valid!"));

        // Attach user information to request object
        req.userId = payload.id;
        req.roleId = payload.roleId;

        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = { verifyToken };
