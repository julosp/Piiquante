const limitter = require('express-rate-limit')

module.exports = (req, res, next) => {
    try {
        limitter({
            windowMs : 5000,
            max : 5,
            message: {
                code: 429,
                message: "Trop de requete, veuillez patienté avant de vous connecté"
            }
        })
        next()
    } catch {
        res.status(401).json({ error });
    }
}