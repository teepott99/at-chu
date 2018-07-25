const express = require('express');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const { ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
// const uploadCloud = require('../config/cloudinary.js');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.redirect('/profile');
});

router.get('/profile', (req, res, next) =>{
  Post.find()
  .then((posts) => {
    res.render('profile', { posts });
  })
  .catch((error) => {
    console.log(error)
  })
});

router.post('/profile', (req, res, next) => {
  const {name, location, tagged, tagLocation, userLatitude, userLongitude, tagLatitude, tagLongitude, comment} =  req.body;
  console.log(name, location, tagged, tagLocation, comment);

  if (name === '' || location === '' || tagged === '' || tagLocation === '' || userLatitude ==='' || userLongitude ==='' || tagLatitude ==='' || tagLongitude ==='' ) {
    res.render('profile', { message: 'Please review and ensure all required information is filled in.' });
    return;
  }

    const newPost = new Post({
      name,
      location: {
        name: location,
        type: "Point",
        coordinates: [userLatitude, userLongitude],
      },
      tagged,
      tagLocation: {
        name: tagLocation,
        type: "Point",
        coordinates: [tagLatitude, tagLongitude],
      },
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
});

router.get('/delete/:id', ensureLoggedIn('/login'), (req, res, next) => {
    // Finds post to delete and deletes it. G EZ
    Post.findByIdAndRemove(req.params.id)
        .then(post => {
            res.redirect('/profile');
        })
        .catch(err => {
            console.log('Error in deleting post:', err);
            next();
        });
});


module.exports = router;
