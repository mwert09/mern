const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());


// ------------------------- MAKING PORT WORK ---------------------------//
let PORT = process.env.PORT;
if(PORT == null || port == "")
{
    PORT = 9000;
}
// ----------------------------------------------------------------------//

mongoose.connect("mongodb://localhost:27017/tododb", {useNewUrlParser: true, useUnifiedTopology: true});

const todoSchema = {
    todo: String,
    createTime: Date
}

const Todo = mongoose.model("Todo", todoSchema);

app.get("/", function(req, res){
    Todo.find(function(err, foundArticles){
        if(!err)
        {
            res.send(foundArticles);
        }
        else
        {
            res.send(err);
        }
        
    });
});

app.post("/", function(req,res){
    console.log(req.body);
    const newTodo = new Todo({
        todo: req.body.todo,
        createTime: req.body.createTime
    });
    console.log(newTodo);
    newTodo.save();
});

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('../FrontEnd/todoapp/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'FrontEnd', 'todoapp', 'build', 'index.html'));
    });
}

/*
//----------------------------------------------------DENEME BOLUMU-------------------------------------------------//
// Returns all todos
function GetAllTodos()
{
    Todo.find(function(err, foundArticles){
        if(!err)
        {
            return foundArticles;
        }
        else
        {
            console.error(err);
            return;
        }
})
}

// Adds a todo to the database
function AddTodo(todo)
{
    const newTodo = new Todo({
        todo: todo.title,
        createTime: todo.time
    });

    newTodo.save();
}
*/


app.listen(PORT, () =>{
    //console.log(process.env);
    console.log("Server started and listening on port ", PORT);
});