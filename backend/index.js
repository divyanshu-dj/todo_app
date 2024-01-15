require('dotenv').config();

const express = require('express');
const app = express();

const { createTodoSchema, updateTodoSchema } = require('./types');

app.use(express.json());

app.post('/todos', (req, res) => {
    try {
        const todo = createTodoSchema.parse(req.body);
        console.log(todo);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

});

app.get('/todos', (req, res) => {

});

app.put('/completed', (req, res) => {
    try {
        const updateTodo = updateTodoSchema.safeParse(req.body);
        console.log(updateTodo);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});