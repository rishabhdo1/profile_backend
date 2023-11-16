/**
 * Author: Siddharth Bisht
 * desc: router for profile
 */

 const express = require("express");
 const router = express.Router();
 const controller = require("../controllers/userController");
 const auth = require('../middleware/authMiddleware');
 const authValidator=require('../middleware/validators/authValidator');

 //router for profile pic 
 router.post('/signup', auth.checkIfUserExist, controller.signup);
 router.post('/login', controller.login);
 router.put('/profile', controller.updateUserProfile);

 
 module.exports = router;