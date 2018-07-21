const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

// routes/auth.js
const express = require('express');
const authRoutes = express.Router();

// User model
const User = require('../models/user');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;


authRoutes.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

authRoutes.post('/signup', (req, res, next) => {
  const nameInput = req.body.firstName;
  const lastNameInput = req.body.lastName;
  const emailInput = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const passwordInput = req.body.password;

  if (emailInput === '' || passwordInput === '') {
    res.render('auth/signup', {
      errorMessage: 'Enter both email and password to sign up.'
    });
    return;
  }

  User.findOne({ email: emailInput }, '_id', (err, existingUser) => {
    if (err) {
      next(err);
      return;
    }

    if (existingUser !== null) {
      res.render('auth/signup', {
        errorMessage: `The email ${emailInput} is already in use.`
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPass = bcrypt.hashSync(passwordInput, salt);

    const userSubmission = {
      name: nameInput,
      lastName: lastNameInput,
      phone: phoneNumber,
      email: emailInput,
      password: hashedPass
    };

    const theUser = new User(userSubmission);

    theUser.save((err) => {
      if (err) {
        res.render('auth/signup', {
          errorMessage: 'Something went wrong. Try again.'
        });
        return;
      }
    })
    .then((userFromDb) => {
      req.session.currentUser = userFromDb;
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    })
  });
});


//Passport Login
authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

//PRIVATE PAGE EXAMPLE - Using for Profile Page
authRoutes.get("/profile/:name", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("profile", { user: req.user });
});


// //Original Login w/ express
// authRoutes.get('/login', (req, res, next) => {
//   res.render('auth/login', {
//     errorMessage: ''
//   });
// });

// authRoutes.post('/login', (req, res, next) => {
//   console.log('body: ', req.body)
//   const emailInput = req.body.email;
//   const passwordInput = req.body.password;

//   if (emailInput === '' || passwordInput === '') {
//     res.render('auth/login', {
//       errorMessage: 'Enter both email and password to log in.'
//     });
//     return;
//   }

//   User.findOne({ email: emailInput }, (err, theUser) => {
//     if (err || theUser === null) {
//       res.render('auth/login', {
//         errorMessage: `There isn't an account with email ${emailInput}.`
//       });
//       return;
//     }

//     if (!bcrypt.compareSync(passwordInput, theUser.password)) {
//       res.render('auth/login', {
//         errorMessage: 'Invalid password.'
//       });
//       return;
//     }
//     req.session.currentUser = theUser;
//     console.log('===== == ====: ', req.session.currentUser)
//     res.redirect('/');
//   });
// });

authRoutes.get('/logout', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/');
    return;
  }

  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect('/');
  });
});


module.exports = authRoutes;