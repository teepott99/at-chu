const express = require('express');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const uploadCloud = require('../config/cloudinary.js');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile/:name', (req, res, next) =>{
  Post.find()
  .then((posts) => {
    res.render('profile', { posts });
  })
  .catch((error) => {
    console.log(error)
  })
});

router.post('/profile/:name', (req, res, next) => {
  console.log(req.body);
  res.render('profile');
});

// router.post('/profile/:name', uploadCloud.single('photo'), (req, res, next) => {
//   const { title, description } = req.body;
//   const imgPath = req.file.url;
//   const imgName = req.file.originalname;
//   const newPost = new Post({title, description, imgPath, imgName})
//   newPost.save()
//   .then(post => {
//     res.redirect('/profile/:name')
//   })
//   .catch(error => {
//     console.log(error)
//   })
// });


module.exports = router;
