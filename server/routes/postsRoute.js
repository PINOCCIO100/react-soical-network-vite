const { Router } = require("express");
const { postPost, getAllMyPostedPosts, getAllMyPosts, getAllUserPosts, deletePost } = require("../controllers/postsController");

const postsRoute = Router();

postsRoute.get('/my', getAllMyPosts)

postsRoute.get('/posted', getAllMyPostedPosts)

postsRoute.post('/send', postPost)

postsRoute.post('/delete', deletePost)

postsRoute.get('/:userID', getAllUserPosts)

exports.postsRoute = postsRoute;


