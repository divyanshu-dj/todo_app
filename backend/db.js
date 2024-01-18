require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
}, { timestamps: true });

const todo = mongoose.model('Todo', todoSchema);

module.exports = {
    todo
};
