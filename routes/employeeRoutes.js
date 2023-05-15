const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.createEmployee);

router.put('/:userId/task/:taskId', employeeController.setEmployeeTask);

router.put('/:userId/task/:taskId/complete', employeeController.completeEmployeeTask);

router.get('/', employeeController.getAllEmployees);

router.get('/:id', employeeController.getOneEmployee);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
