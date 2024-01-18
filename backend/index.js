require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const { createTodoSchema, updateTodoSchema } = require('./types');
const { todo } = require('./db');

app.use(express.json());

app.post('/todo', async (req, res) => {
    try {
        const todoData = createTodoSchema.parse(req.body);
        console.log(todoData);
        await todo.create({
            title: todoData.title,
            description: todoData.description,
            completed: "false"
        });

        res.status(200).json({ message: "Todo created" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Invalid Input' });
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await todo.find().sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.put('/completed', async (req, res) => {
    try {
        const updateTodo = updateTodoSchema.safeParse(req.body);
        const completetodo =  await todo.updateOne(
            { _id: updateTodo.data.id },
            { completed: true },
            { new: true }
        );
        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Invalid Input' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
