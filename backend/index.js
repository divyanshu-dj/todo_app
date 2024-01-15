require('dotenv').config();

const express = require('express');
const app = express();

const { createTodoSchema, updateTodoSchema } = require('./types');
const { todo } = require('./db');

app.use(express.json());

app.post('/todos', async (req, res) => {
    try {
        const todo = createTodoSchema.parse(req.body);
        console.log(todo);
        await todo.create({
            title: todo.title,
            description: todo.description,
            completed: false
        });
        
        res.status(200).json("Todo created");
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

});

app.get('/todos', async (req, res) => {
    try{
        const todos = await todo.find();
        res.status(200).json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/completed', async (req, res) => {
    try {
        const updateTodo = updateTodoSchema.safeParse(req.body);
        console.log(updateTodo);
        await todo.update({
            _id: updateTodo.id
        }, {
            completed: true
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running`);
});