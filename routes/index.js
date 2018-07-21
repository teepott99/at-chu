const express = require('express');
const User = require('../models/user.js');
const Post = require('../models/post.js');
// const uploadCloud = require('../config/cloudinary.js');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// //PRIVATE PAGE EXAMPLE - Using for Profile Page
// authRoutes.get("/profile/", ensureLogin.ensureLoggedIn(), (req, res) => {
//   ;
// });

router.get('/profile', (req, res, next) =>{
  Post.find()
  .then((posts) => {
    res.render('profile', { posts });
  })
  .catch((error) => {
    console.log(error)
  })
});

// router.post('/profile', (req, res, next) => {
//   console.log(req.body);
//   res.render('profile');
// });

router.post('/profile', (req, res, next) => {
  const name         = req.body.user;
  const location     = req.body.location;
  const tagged       = req.body.tagged;
  const tagLocation  = req.body.tagLocation;
  const comment      = req.body.comment;
  console.log(name, location, tagged, tagLocation, comment);

  if (name === '' || location === '' || tagged === '' || tagLocation === '') {
    res.render('profile', { message: 'Please review and ensure all required information is filled in.' });
    return;
  }

    const newPost = new Post({
      name,
      location,
      tagged,
      tagLocation,
      comment
    });

    newPost.save((err) => {
      if (err) {
        res.render('profile', { message: `Something went wrong ${err}` });
      }
    })
    .then((postFromDb) => {
      res.redirect('/profile');
    })
    .catch(error => {
      next(error)
    })
  })
  // .catch(error => {
  //   next(error)
  // });
// });



module.exports = router;
