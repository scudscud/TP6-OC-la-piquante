const express = require("express");
const router = express.Router();
const ctrSauce = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
  // ----- route api sauce ------ \\
    // ----- trouver sauces ------- \\
router.get("/", auth, ctrSauce.findSauce);
  // ----- trouver une sauce ------- \\
router.get("/:id", auth, ctrSauce.findOneSauce);
  // ----- modifier une sauce ------- \\
router.put("/:id", auth, ctrSauce.modififySauce);
  // ----- supprimer une sauce ------- \\
router.delete("/:id", auth, ctrSauce.deleteSauce);
  // ----- creer une sauce ------- \\
router.post("/", auth, multer, ctrSauce.createSauce);
  // ----- liker disliker une sauce ------- \\
router.post("/:id/like", auth, ctrSauce.likeUpdateSauce);
module.exports = router;
