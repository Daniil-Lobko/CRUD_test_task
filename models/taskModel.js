const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    completedAt: Date,
    priority: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
