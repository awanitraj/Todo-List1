const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const TodoModel = require('./models/Todo');

const DB = 'mongodb+srv://ujwalraj052:qhdsf3q3YtJT47gG@cluster0.tgr2c.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(DB)
    .then(() => console.log(`Connection successful`))
    .catch(err => console.log(`No connection`, err));

app.use(cors());
app.use(express.json());

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ task })
        .then(result => res.status(201).json(result))
        .catch(err => res.status(400).json({ error: err.message }));
});


app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
   
});

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
 
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))

})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
