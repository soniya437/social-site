const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const postController = require('../controller/postController')
const MW = require('../middlewares/auth')

router.post('/register', userController.createUser)// create user

router.post('/login', userController.loginUser)// login user
router.post('/uploadPost',MW.authenticate, postController.uploadPost)/// upload post

router.post('/likePost/:postId',MW.authenticate,postController.likePost)// like post
router.post('/UnlikePost/:postId',postController.UnlikePost)// unlike post
router.post('/follow/:userId',userController.followUser)  // follow user
router.post('/unfollow/:userId',userController.unfollow) //unfollow user

router.get('/allUser',userController.getUser)  ////get all user
router.get('/folllowCount/:userId',postController.followingcount)  // count all followers




router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.all('/*', function (req, res) {
    return res.status(400).send({ status: false, message: "check url" })
})





module.exports = router;