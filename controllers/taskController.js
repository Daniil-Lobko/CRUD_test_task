const Task = require('../models/taskModel');
const logger = require('../logger');

async function createTask(req, res) {
    try {
        const taskData = req.body;
        const task = await Task.create(taskData);

        await task.save();
        logger.info('Задача успешно создана');
        res.status(201).json(task);
    } catch (err) {
        logger.error('Ошибка при создании задачи:', err);
        res.status(500).json({error: 'Ошибка сервера'});
    }
};

async function getAllTask(req, res) {
    try {
        const tasks = await Task.find();
        logger.info('Список задач успешно получен');
        res.json(tasks);
    } catch (err) {
        logger.error('Ошибка при получении списка задач:', err);
        res.status(500).json({error: 'Ошибка сервера'});
    }
};

async function getOneTask(req, res) {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if (!task) {
            logger.error('Задача не найдена');
            return res.status(404).json({error: 'Задача не найдена'});
        }
        logger.info(`Данные задачи с ID ${id} успешно получены`);
        res.json(task);
    } catch (err) {
        logger.error('Ошибка при получении данных задачи:', err);
        res.status(500).json({error: 'Ошибка сервера'});
    }
};


module.exports = {
    createTask,
    getOneTask,
    getAllTask
};
