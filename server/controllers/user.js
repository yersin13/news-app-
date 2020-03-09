



const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')


const router = express.Router()
const mongoose = require('mongoose');
const session = require('express-session');


//const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");

mongoose.set("useCreateIndex", true);
const app = express()

const {
    check,
    validationResult,
    body
} = require('express-validator');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


const User = require ('../models/user-model')



/// set app.use for session

app.use(session({
    secret: "Our Little secret.",
    resave: false,
    saveUninitialized: false
}));



///set app.use passport to initilize and session.
/// add plugin to UserSchema
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);



app.use(passport.initialize());
app.use(passport.session());

//passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: "904217430952-ek8764qmuo4olarch7q3tbham2h4unbd.apps.googleusercontent.com",
        clientSecret: "FT5R7lAfRW9ac_ZoPJODGY0H",
        callbackURL: "/auth/google/secrets",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
));




router.get("/", function (req, res) {
//    res.render("home");
console.log("Home page test")
});

router.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile"]
    }));

router.get('/auth/google/secrets',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect to secret.
        res.redirect('/secrets');
    });
router.get("/login", function (req, res) {
//    res.render("login");
    console.log("This is login page")
});


router.get("/register", function (req, res) {nh  
//    res.render("register");
    console.log("Register page test")
});

router.get("/secrets", function (req, res) {
    User.find({
        "secret": {
            $ne: null
        }
    }, function (err, foundUsers) {
        if (err) {
            console.log(err);
        } else {
            if (foundUsers) {

                Secret.find({}, function (err, secret) {
                    console.log(foundUsers._id);
                    res.render("secrets", {
                        usersWithSecrets: secret
                    });
                });
            }
        }
    });
});

router.get("/submit", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});



router.post("/submit", function (req, res) {
   const submittedSecret = req.body.secret;

   const userId = req.user.id;

   User.findById(req.user.id, function (err, foundUser) {
       if (err) {
           console.log(err);
       } else {
           if (foundUser) {
               
               const secret = new Secret({
                   name: submittedSecret
               });
               secret.save(function () {
                   User.findOne({
                       _id: userId
                   }, function (err, foundUser) {
                       foundUser.secrets.push(secret);
                       foundUser.save();
                       res.redirect("/secrets");
                   });
               })
           }
       }
   });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



router.post("/register", [
    // username must be an email
  check('username').isEmail().normalizeEmail(),

  // password must be at least 5 chars long

   check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({
        min: 5
    })
], function (req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).json({
            errors: errors.array()
        });
    } else {
        
         const body = req.body
    
    if(!body) {
        return res.status(400).json ({
            success:false,
            error:'You must provide a user',
        })
    }
    
    const user = new (body)
    
    if(!user){
        return res.status(400).json({ success:false, error: err})
    }
    
    post
        .save()
        .then(() => {
        return res.status(201).json({
            success: true,
            id:post._id,
            message:'Post created',
        })
    })

        .catch (error => {
        return res.status(400).json ({
            error,
            message:'Post Not created',
        })
    })
        
        
        
        
//
//        User.register({
//            username: req.body.username
//        }, req.body.password, function (err, user) {
//            if (err) {
//                console.log(err);
//                res.redirect("/register");
//            } else {
//                passport.authenticate("local")(req, res, function () {
////                    res.redirect("/secrets");
//                    console.log("Your are in ")
//                });
//
//            }
//        });
    }

});


router.post("/login", function (req, res) {

    const user = new User({
        username: req.body.username,
        password: req.body.password

    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    });


});




