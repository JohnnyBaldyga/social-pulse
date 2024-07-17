const router = require("express").Router();
const { User, Event } = require("../models");
const withAuth = require("../utils/auth");
const { Op } = require("sequelize");

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
    res.redirect("/login");
    return;
  }

  res.render("login-view");
});

router.get("/events", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/login");
      return;
    }

    const location = req.query.location;

    if (location) {
      const eventData = await Event.findAll({
        where: {
          location: {
            [Op.iLike]: `%${location}%`,
          },
        },
      });
      const events = eventData.map((event) => event.get({ plain: true }));

      res.render("eventpage", {
        events,
        logged_in: req.session.logged_in,
      });
    } else {
      const eventData = await Event.findAll();
      const events = eventData.map((event) => event.get({ plain: true }));

      res.render("eventpage", {
        events,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
