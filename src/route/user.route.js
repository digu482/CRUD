const express = require('express')
const router = express.Router()
const User = require("../model/user");
const controller = require("../controller/user.controller")
const {userverifyToken} = require("../middleware/Auth");
const uploadFile = require("../middleware/upload")
const frontEndUrl =  'http://localhost:1010'




router.post("/register",uploadFile,controller.createuser);
router.get("/userfind",userverifyToken,controller.userfind);
router.patch("/:id",userverifyToken,controller.updateuser);
router.delete("/userdelete", userverifyToken,controller.userdelete);
router.post("/changepassword",userverifyToken,controller.changepassword);
router.patch("/updateprofile/:id",userverifyToken,uploadFile,controller.updateProfile)



router.post("/login",controller.UserLogin);
router.post("/logout", userverifyToken,controller.logout);



module.exports = router