const User = require("../Models/userModel");

const postModel = require("../Models/postModel");


const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: "AKIAY3L35MCRZNIRGT6N",
  secretAccessKey: "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",
  region: "ap-south-1"
})

let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) {
    let s3 = new aws.S3({ apiVersion: '2006-03-01' });

    var uploadParams = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: `${Date.now()}+${file.originalname}`,
      Body: file.buffer
    }


    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ "error": err })
      }
      // console.log(data)
      console.log("file uploaded succesfully")
      return resolve(data.Location)
    })
  })
}

const uploadPost = async function (req, res) {
  try {
    const { text, images, videos, hashtags, friendTags } = req.body
    let files = req.files
    let uploadedFileURL
    if (files && files.length > 0) {
      uploadedFileURL = await uploadFile(files[0])
    }
    const savedData = {
      text: text, images: images, videos: videos, hashtags: hashtags, friendTags: friendTags, url: uploadedFileURL
    }
    let result = await postModel.create(savedData);
    res.status(201).send({ status: true, message: "success", data: result })
  }



  catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
    
  }

}



const likePost = async function (req, res) {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    // Find the post by ID in the database
    const post = await postModel.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the post has already been liked by the user
    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: 'Post already liked' });
    }

    // Add the user ID to the likes array
    post.likes.push(userId);

    // Save the updated post in the database
    await post.save();

    res.json({ message: 'Post liked successfully' });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });

  }
}

// Define a route for unliking a post
const UnlikePost = async function (req, res) {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    // Find the post by ID in the database
    const post = await postModel.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (post.likes.includes(userId)) {
      const index = post.likes.indexOf(userId);

      post.likes.splice(index, 1);

    await post.save();

    res.json({ message: 'Post unliked successfully' })};
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
}
const followingcount = async function(req, res)  {
  try {
    const userId = req.params.userId
    const user = await User.findById(userId);
  
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
     
         await  user.save()
       let count = await  user.following.length;
    res.json({ message: "followcount successfully ", count : count  });
      }
    }

    
   catch (error) {
    return res.status(500).send({ status: false, msg: err.message });
  }}
  



module.exports = { uploadPost, likePost,UnlikePost ,followingcount}
