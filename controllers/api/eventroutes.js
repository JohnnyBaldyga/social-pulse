// Dependencies
const router = require("express").Router();
const { Event, User } = require("../models");
const withAuth = require("../utils/auth");

// GET all
router.get("/", async (req, res) => {
  try {
    const eventData = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const events = eventData.map((event) => event.get({ plain: true }));
    res.render("homepage", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET event by id

// POST event

// Update event

// Delete event

// Login middleware to prevent access

//
