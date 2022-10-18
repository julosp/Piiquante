const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");

router.post("/", saucesCtrl.createSauces);
router.put("/:id", saucesCtrl.modifySauces);
router.delete("/:id", saucesCtrl.deleteSauces);
router.get("/:id", saucesCtrl.getOneSauces);
router.get("/", saucesCtrl.getAllSauces);

module.exports = router;
