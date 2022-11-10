const express = require("express");
const router = express.Router();

const limitter = require("../middleware/limitter");
const passwordValidator = require("../middleware/password-validator");

const userCtrl = require("../controllers/user");

router.post("/signup", passwordValidator, userCtrl.signup);
router.post("/login", limitter, userCtrl.login);

module.exports = router;
