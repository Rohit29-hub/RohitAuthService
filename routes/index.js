var express = require("express");
var router = express.Router();

const localStrategy = require("passport-local");
const passport = require("passport");
const userModel = require("./users");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", (req, res) => {
  res.render(
    'index'
  )
});

router.get("/login", (req, res) => {
  res.render("login", { error: req.flash("error") });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/profile", isLoggedIn, async (req, res) => {
  try {
    const userData = await userModel.findOne({ username: req.session.passport.user })
    res.render(
      'profile' , {user : userData}
    )
  } catch (err) {
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  const newUser = await userModel({
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  });

  userModel.register(newUser, req.body.password).then((registeredUser) => {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
module.exports = router;
