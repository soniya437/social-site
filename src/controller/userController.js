const User = require("../Models/userModel");
const jwt = require('jsonwebtoken')

const userModel = require('../Models/userModel')

// User registration
const createUser = async (req, res) => {
  try {
    const userData = req.body
    const { name, password, email_id, user_name, gender, mobile } = userData;

    if (!name) {
      return res.status(400).send({ msg: "name is not present" });
    }
    if (!password) {
      return res.status(400).send({ msg: "password is not present" });
    }
    if (!email_id) {
      return res.status(400).send({ msg: "email_id is not present" });
    }
    if (!user_name) {
      return res.status(400).send({ msg: "user_name is not present" });
    }
    if (!Email) {
      return res.status(400).send({ msg: "Email is not present" });
    }
    const userCount = await User.find();
    userData.user_id = (userCount.length + 1)

    const savedUser = await User.create(userData);
    res.json({ message: "created", data: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

//************************************************************** */
const loginUser = async function (req, res) {

  try {
    const Email = req.body.email_id;
    const Password = req.body.password;
    if (!Email) {
      return res.status(400).send({ msg: "Email is not present" });
    }
    if (!Password) {
      return res.status(400).send({ msg: "Password is not present" });
    }
    let user = await userModel.findOne({ email_id: Email, password: Password });
    if (!user) {
      return res.status(404).send({ status: false, msg: "Email or Password is not corerct" });
    }
    let token = jwt.sign({ userId: User._id }, "secretkey")
    return res.status(200).send({ status: true, token: token });
  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}

//******************followuser*********************************** */
const followUser = async function (req, res) {
  try {
    const { userId } = req.params;
    const { followId } = req.body
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      if (user.followers.includes(followId)) {
        res.status(400).json({ error: 'User is already being followed' });
      } else {
        user.following.push(followId);
        user.save()
        let followingUser=await User.findById(followId)
        followingUser.followers.push(userId)
        followingUser.save()

        return res.json({ message: 'User followed successfully' });
    }}
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

///*********unfollow user api***************************************** */
const unfollow = async function (req, res) {
  try {
    const { userId } = req.params;
    const { followId } = req.body
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      
      if (user.followers.includes(followId)) {

        res.status(400).json({ error: 'User is already being unfollowed' });
      } else {
        user.following.splice(followId,1);
      
       await  user.save()
        let followingUser=await User.findById(followId)
        followingUser.followers.splice(userId,1)
        followingUser.save()

        return res.json({ message: 'User unfollowed successfully' });
    }}
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}



// get all user
const getUser = async (req, res) => {
  try {
    const alluser = await userModel.find({ isDeleted: false })

    return res.status(200).send({ status: true, data: alluser })
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}



module.exports = { createUser, loginUser, followUser, unfollow, getUser }


