// Dependencies
const router = require("express").Router();
const { Event, User } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all
router.get("/", withAuth, async (req, res) => {
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
    res.render("event", {
      events,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET event by id
router.get("/event/:id", withAuth, async (req, res) => {
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
    if (!eventData) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
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
router.post("/", withAuth, async (req, res) => {
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Update event
router.put("/:id", withAuth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    if (event.user_id !== req.session.user_id) {
      res
        .status(403)
        .json({ message: "You are not authorized to update this event" });
      return;
    }

    const updatedEvent = await event.update(req.body);

    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Delete event
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: "No event found" });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
