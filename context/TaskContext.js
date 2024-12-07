import React, { createContext, useState } from 'react';

// Create Context
export const TaskContext = createContext();

// TaskProvider component to wrap the app and provide state
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(['Go To Gym', 'Study For 4 Hours']);
    const [completedTasks, setCompletedTasks] = useState([]);

    // Add new task
    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    // Complete task (move to completed)
    const completeTask = (index) => {
        const taskToComplete = tasks[index];
        setCompletedTasks([...completedTasks, taskToComplete]);
        setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
    };

    // Delete task
    const deleteTask = (index) => {
        setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                completedTasks,
                addTask,
                completeTask,
                deleteTask
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
