const mongoose = require('mongoose');
const Task = require('../models/taskModel')

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    department: { type: String },
    salary: { type: Number },
    hired: { type: Date },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
