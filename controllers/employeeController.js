const Employee = require('../models/employeeModel');
const Task = require('../models/taskModel');
const logger = require('../logger');

async function createEmployee(req, res) {
    try {
        const employeeData = req.body;
        const employee = await Employee.create(employeeData);
        res.status(201).json(employee);
    } catch (error) {
        logger.error('Ошибка при создании сотрудника:', error);
        res.status(500).json({error: 'Ошибка сервера'});
    }
}

async function setEmployeeTask(req, res) {
    try {
        const {userId} = req.params;
        const taskId = req.params.taskId.trim();

        const employee = await Employee.findById(userId);
        if (!employee) {
            return res.status(404).json({error: 'Сотрудник не найден'});
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({error: 'Задача не найдена'});
        }
        employee.tasks.push(task);
        task.employeeId = employee._id;
        await Promise.all([employee.save(), task.save()]);

        res.sendStatus(200);
    } catch (err) {
        logger.error('Ошибка при назначении задачи сотруднику:', err);
        res.status(500).json({error: 'Ошибка сервера'});
    }
}

async function completeEmployeeTask(req, res) {
    try {
        const {userId, taskId} = req.params;

        const employee = await Employee.findById(userId);
        if (!employee) {
            return res.status(404).json({error: 'Сотрудник не найден'});
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({error: 'Задача не найдена'});
        }

        employee.tasks.pull(task);
        await employee.save();

        task.updatedAt = new Date();
        task.completedAt = new Date();
        await task.save();

        res.sendStatus(200);
    } catch (err) {
        logger.error('Ошибка при завершении задачи сотрудником:', err);
        res.status(500).json({error: 'Ошибка сервера'});
    }
}

async function getAllEmployees(req, res) {
    try {
        const employees = await Employee.find();
        logger.info('Список сотрудников успешно получен');
        res.json(employees);
    } catch (err) {
        logger.error('Ошибка при получении списка сотрудников:', err);
        res.status(500).json({error: 'Ошибка сервера'});
    }
}

async function getOneEmployee(req, res) {
    try {
        const {id} = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            logger.error('Сотрудник не найден');
            return res.status(404).json({error: 'Сотрудник не найден'});
        }
        logger.info(`Данные сотрудника с ID ${id} успешно получены`);
        res.json(employee);
    } catch (err) {
        logger.error('Ошибка при получении данных сотрудника:', err);
        res.status(500).json({error: 'Ошибка сервера'});
    }
}

async function deleteEmployee(req, res) {
    try {
        const {id} = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            logger.error('Сотрудник не найден');
            return res.status(404).json({error: 'Сотрудник не найден'});
        }
        logger.info(`Сотрудник с ID ${id} успешно удален`);
        res.sendStatus(200);
    } catch (err) {
        logger.error('Ошибка при удалении сотрудника:', err);
        res.status(500).json({error: 'Ошибка сервера'});
    }
}

module.exports = {
    createEmployee,
    setEmployeeTask,
    completeEmployeeTask,
    getOneEmployee,
    getAllEmployees,
    deleteEmployee
};
