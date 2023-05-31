const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    text:{
type:String,
} , 
  owner: {
    type: ObjectId,
    ref: "User",
  },
  likes: [
    {
      type:ObjectId,
      ref: "User"
    },
  ],
  url:String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);