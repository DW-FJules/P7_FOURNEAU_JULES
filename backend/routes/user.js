const express = require("express");

const router = express.Router();

const userCtrl = require("../controllers/user");

const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", auth, userCtrl.delete);
router.get("/profile", auth, userCtrl.profile);
router.get("/:id", auth, userCtrl.getUserById)

module.exports = router;
