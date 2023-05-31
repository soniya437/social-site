const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"]
  },
  user_id: {
    type: Number
  },
  email_id: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  user_name: {
    type: String,
    unique: true,
    required: true
  },
  
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  mobile: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isDeleted :{
type:Boolean,
default:false

  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("User", userSchema);