var express = require("express");
var router = express.Router();
//var LocalStorage = require("node-localstorage").LocalStorage;
//localStorage = new LocalStorage("./scratch");

const users = [{ id: 0, pseudo: "valentin", password: "dieu", isAdmin: true }];

/* GET home page. */
router.get("/", function(req, res, next) {
  res.clearCookie("user");
  res.render("login", { error: "" });
});

router.get("/disconnect", function(req, res, next) {
  res.clearCookie("user");
  res.redirect("/login");
});

router.post("/", function(req, res, next) {
  let find = false;
  console.log(users.length);
  if (req.body.pseudo && req.body.password) {
    var user = {
      id: users.length,
      pseudo: req.body.pseudo,
      password: req.body.password,
      isAdmin: req.body.isAdmin
    };
    users.forEach((element, index) => {
      if (element.pseudo === user.pseudo) {
        find = true;
        if (element.password === user.password) {
          //sessionStorage.setItem("pseudo", user.pseudo);
          res.cookie("user", element);
          res.redirect("/conference");
        } else {
          res.render("login", { error: "Mot de passe incorrect" });
        }
      }
    });
    if (!find) {
      users.push(user);
      res.cookie("user", user);
      res.redirect("/conference");
    }
  } else {
    res.render("login", { error: "Veuillez remplir tous les champs" });
  }
});

module.exports = router;
