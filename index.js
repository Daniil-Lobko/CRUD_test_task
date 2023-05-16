const express = require('express');
const app = express();
const logger = require('./logger');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/employee', employeeRoutes);
app.use('/task', taskRoutes);

const mongoURL = 'mongodb+srv://user:1121@cluster0.f7xdvnz.mongodb.net/';
const port = 3003;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('Connected to MongoDB');
        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        logger.error('Failed to connect to MongoDB:', error);
    });

