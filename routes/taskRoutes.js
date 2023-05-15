const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route for creating a new task
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTask);
router.get('/:id', taskController.getOneTask);

module.exports = router;
