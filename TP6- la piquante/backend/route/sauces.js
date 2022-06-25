const express = require("express")
const router = express.Router()
const ctrSauce = require('../controller/sauces')

router.get("/",ctrSauce.findSauce)
router.get("/:id", ctrSauce.findOneSauce )
router.put("/:id",ctrSauce.modififySauce)
router.delete("/:id",ctrSauce.deleteSauce)
router.post("/",ctrSauce.createSauce);
  
module.exports = router;
