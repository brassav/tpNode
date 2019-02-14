var express = require("express");
var router = express.Router();

const confs = [];

/* GET conference page. */
router.get("/", function(req, res, next) {
  console.log(req.cookies.user);
  res.render("conference", { confs: confs, user: req.cookies.user });
});

router.get("/add", function(req, res, next) {
  res.render("addConference", { error: "", user: req.cookies.user });
});

router.get("/register/:index", function(req, res, next) {
  if (
    confs[req.params.index].nbParticipants < confs[req.params.index].maxPeople
  ) {
    confs[req.params.index].participants.push(req.cookies.user);
    confs[req.params.index].nbParticipants++;
  }
  res.render("conference", { confs: confs, user: req.cookies.user });
});

router.get("/unregister/:index", function(req, res, next) {
  var pos;
  confs[req.params.index].participants.forEach(function(element, index) {
    if (element.pseudo === req.cookies.user.pseudo) {
      pos = index;
    }
  });
  confs[req.params.index].participants.splice(pos, 1);
  confs[req.params.index].nbParticipants--;
  res.render("conference", { confs: confs, user: req.cookies.user });
});

router.get("/delete/:index", function(req, res, next) {
  confs.splice(req.params.index, 1);
  res.render("conference", { confs: confs, user: req.cookies.user });
});

router.post("/add", function(req, res, next) {
  if (
    req.body.name &&
    req.body.autor &&
    req.body.date &&
    req.body.timeBegin &&
    req.body.timeEnd &&
    req.body.maxPeople
  ) {
    var conf = {
      name: req.body.name,
      autor: req.body.autor,
      date: req.body.date,
      timeBegin: req.body.timeBegin,
      timeEnd: req.body.timeEnd,
      maxPeople: req.body.maxPeople,
      participants: [],
      nbParticipants: 0
    };
    confs.push(conf);
    res.redirect("/conference");
  } else
    res.render("addConference", {
      error: "Veuillez remplir tous les champs",
      user: req.cookies.user
    });
});

module.exports = router;
