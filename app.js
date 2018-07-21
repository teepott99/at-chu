require('dotenv').config();

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');
const bcrypt        = require("bcrypt");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore    = require('connect-mongo')(session);
const express       = require('express');
const favicon       = require('serve-favicon');
const hbs           = require('hbs');
const mongoose      = require('mongoose');
const logger        = require('morgan');
const path          = require('path');
const flash = require('connect-flash');
const User = require('./models/user');

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = '@chu';


//session
app.use(session({
  secret: '@chu',
  resave: true,
  saveUninitialized: true,
  // //Sessions Removed
  // cookie: { maxAge: 600000000000000000000000000000 },
  // store: new MongoStore({
  //   mongooseConnection: mongoose.connection,
  //   ttl: 24 * 60 * 60 // 1 day
  // })
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());
passport.use(new LocalStrategy({
  passReqToCallback: true,
  usernameField:'email'
},
  (req, email, password, next) => {
  console.log("blah");
  User.findOne({ email }, (err, user) => {
    console.log('user:', user);
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect email" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

//Passport integration
app.use(passport.initialize());
app.use(passport.session());


//Confirm currentUser is logged in. 
app.use((req, res, next) => {
  if(req.user){
    res.locals.user = req.user;
  }
  // if (req.session.currentUser) {
  //   // console.log('here: ', req.session.currentUser);
  //   res.locals.currentUserInfo = req.session.currentUser;
  //   res.locals.isUserLoggedIn = true;
  // } else {
  //   res.locals.isUserLoggedIn = false;
  // }
  next();
});






const index        = require('./routes/index');
const authRoutes   = require('./routes/auth');
app.use('/', index);
app.use('/', authRoutes);



module.exports = app;
