const sequelize = require('../config/connection');
//change project to event 
const { User, Event } = require('../models');

// add event and create user data json in seed folder
const userData = require('./userData.json');
const eventData = require('./eventData.json');
//change event iteration from project 
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const event of eventData) {
    await Event.create({
      ...event,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

