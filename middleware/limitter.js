const limitter = require('express-rate-limit') //appel de limitter

module.exports = (req, res, next) => {
    try {
        limitter({ //limite a 5 connexion toutes les 5 secondes
            windowMs : 5000, 
            max : 5,
            message: {
                code: 429,
                message: "Trop de requete, veuillez patienté avant de vous connecté"
            }
        })
        next()
    } catch {
        res.status(401).json({ error }); //message d'erreur
    }
}