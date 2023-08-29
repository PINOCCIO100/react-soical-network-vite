const Posts = require("../models/Posts");
const Rating = require("../models/Rating");


exports.getAllMyPosts = async (req, res) => {
  try {
    const posts = await Posts.find({ accepterID: req.session.id }, { __v: 0 });
    res.json(posts)
  } catch (e) {
    console.log(e.message);
  }
}

exports.getAllUserPosts = async (req, res) => {
  try {
    const posts = await Posts.find({ accepterID: req.params.userID }, { __v: 0 });
    res.json(posts)
  } catch (e) {
    console.log(e.message);
  }
}

exports.getAllMyPostedPosts = async (req, res) => {
}

exports.postPost = async (req, res) => {
  const senderID = req.session.id
  const { accepterID, post } = req.body;
  try {
    const postBody = await Posts.create({
      senderID,
      accepterID,
      post,
      postDate: Date.now(),
    });
    res.json({
      resultCode: 0,
      data: postBody,
      message: [],
    })
  } catch (e) {
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}

exports.deletePost = async (req, res) => {
  const userID = req.session.id
  const { postID, senderID, accepterID } = req.body;
  try {
    if (userID !== senderID && userID !== accepterID) {
      throw new Error(`User ${userID} has not permission for deleting this post!`)
    }
    await Posts.deleteOne({ _id: postID })
    res.json({
      resultCode: 0,
      message: [],
    })
  } catch (e) {
    console.log(e.message);
    res.json({
      resultCode: 1,
      message: [e.message]
    })
  }
}