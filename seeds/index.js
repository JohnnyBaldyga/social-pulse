const sequelize = require('../config/connection');
//change project to event 
const { User, Project } = require('../models');

// add event and create user data json in seed folder
const userData = require('./userData.json');
const projectData = require('./projectData.json');
//change event iteration from project 
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

