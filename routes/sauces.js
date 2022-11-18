const express = require("express"); //appel d'Express 
const router = express.Router(); //appel de la fonction router de Express pour gerer les routes 

const auth = require("../middleware/auth"); //appel du middleware Auth
const multer = require("../middleware/multer-config"); //appel du middleware Multer


const saucesCtrl = require("../controllers/sauces"); //appel du controlleurs sauces
const likeCtrl = require("../controllers/like"); //appel du controlleurs like

router.get("/", auth, saucesCtrl.getAllSauces); //route get pour recuperer les sauces
router.post("/", auth, multer, saucesCtrl.createSauces); //route post pour crée une sauces
router.get("/:id", auth, saucesCtrl.getOneSauces); //route get pour recuperer une sauces selon l'ID
router.put("/:id", auth, multer, saucesCtrl.modifySauces); //route put pour modifier une sauces selon l'ID
router.delete("/:id", auth, saucesCtrl.deleteSauces); //route delete pour supprimer une sauces selon l'ID
router.post("/:id/like", auth, likeCtrl.likeSauces) //route post pour liker une sauces selon l'ID


module.exports = router; //export des routes
