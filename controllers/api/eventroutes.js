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
          attributes: ["name", "description", "event_date", "location"],
        },
      ],
    });
    const events = eventData.map((event) => event.get({ plain: true }));
    res.render("event", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET event by id
router.get("/event/:id", async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: [
            "name",
            "description",
            "event_date",
            "date_created",
            "location",
          ],
        },
      ],
    });
    const event = eventData.get({ plain: true });
    res.render("event", {
      ...event,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST event

// Update event

// Delete event

// Login middleware to prevent access

//
