const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

router.get("/:postId", auth, commentCtrl.getAll);
router.post("/", auth, commentCtrl.create);
router.delete("/:id", auth, commentCtrl.delete);

module.exports = router;
