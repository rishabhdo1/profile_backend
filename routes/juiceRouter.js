const express = require("express");
const router = express.Router();
const juiceController = require("../controllers/juiceController");
const auth = require("../middleware/authMiddleware");

//router for profile pic 
router.get("/getjuiceList", juiceController.getjuiceProducts);
router.get("/getjuiceDetails", juiceController.getjuiceDetails);
router.put("/savejuiceProducts", juiceController.savejuiceProducts);

module.exports = router;
