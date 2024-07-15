const router = require('express').Router();
const userRoutes = require('');
const eventRoutes = require('');

router.use('', userRoutes);
router.use('', eventRoutes);

module.exports=router