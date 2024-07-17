const router = require("express").Router();
const { User, Event } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login-view");
});

router.get("/events", async (req, res) => {
  console.log(req.query.location);
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }
    try {
      const eventData = await Event.findAll();
      const events = eventData.map((event) => event.get({ plain: true }));

      res.render("eventpage", {
        events,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;
