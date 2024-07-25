import React, { useState, useEffect } from 'react';
import './Todo.css';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';

function Task({ task, index, completeTask, removeTask }) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}

            <div className="buttons">
                <button className="complete-btn" onClick={() => completeTask(index)}>
                    <FaCheck />
                </button>
                <button className="remove-btn" onClick={() => removeTask(index)}>
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    );
}

function CreateTask({ addTask }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }
    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
            <button type="submit" className="add-btn">Add</button>
        </form>
    );
}

function Todo() {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([
        {
            title: "Complete the notes",
            completed: true
        },
        {
            title: "Solve the problems",
            completed: true
        },
        {
            title: "Visit the doctor",
            completed: false
        }
    ]);

    useEffect(() => { 
        setTasksRemaining(tasks.filter(task => !task.completed).length) 
    }, [tasks]); // Add tasks as a dependency

    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };

    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <>
            <div className="app-header">TaskTracker</div>
            <div className="todo-container">
                <div className="header">Pending tasks ({tasksRemaining})</div>
                <div className="tasks">
                    {tasks.map((task, index) => (
                        <Task
                            task={task}
                            index={index}
                            completeTask={completeTask}
                            removeTask={removeTask}
                            key={index}
                        />
                    ))}
                </div>
                <div className="create-task">
                    <CreateTask addTask={addTask} />
                </div>
            </div>
        </>
    );
}

export default Todo;
