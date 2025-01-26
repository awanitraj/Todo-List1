import { useState, useEffect } from "react";
import Create from "./create"; 
import axios from "axios";
import './App.css';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs'; 

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const result = await axios.get('http://localhost:3001/get');
            setTodos(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (id) => {
        const todoToEdit = todos.find(todo => todo._id === id);
        const updatedTodo = { ...todoToEdit, done: !todoToEdit.done }; 

        axios.put(`http://localhost:3001/update/${id}`, updatedTodo)
            .then(() => fetchTodos())
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => fetchTodos()) 
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create />
            {
                todos.length === 0 
                ? <div><h2>No Records</h2></div>
                : todos.map(todo => (
                    <div className="task" key={todo._id}>
                        <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                            {todo.done ? 
                                <BsFillCheckCircleFill className="icon" />
                                : <BsCircleFill className="icon" />
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span onClick={() => handleDelete(todo._id)}>
                                <BsFillTrashFill className='icon' />
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
