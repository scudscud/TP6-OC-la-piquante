const express = require("express");
const router = express.Router();
const ctrSauce = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer")



router.get("/", auth, ctrSauce.findSauce);
router.get("/:id", auth, ctrSauce.findOneSauce);
router.put("/:id", auth, ctrSauce.modififySauce);
router.delete("/:id", auth, ctrSauce.deleteSauce);
router.post("/", auth,multer, ctrSauce.createSauce);
router.post('/:id/like', auth, ctrSauce.likeSauce)
module.exports = router;
