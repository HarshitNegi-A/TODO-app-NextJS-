import React, { useState, Fragment, useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; // Import the context
import styles from './HomePage.module.css';
import Header from './Header';

const HomePage = () => {
    const [newTask, setNewTask] = useState('');
    const { tasks, completedTasks, addTask, completeTask, deleteTask } = useContext(TaskContext); // Directly use useContext

    const [showModal, setShowModal] = useState(false);

    // Handle adding a new task
    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            addTask(newTask);
            setNewTask('');
            setShowModal(false); // Close modal after adding task
        }
    };

    return (
        <Fragment>
            <Header />
            <div className={styles.body}>
                <button
                    className={styles.addTaskButton}
                    onClick={() => setShowModal(true)}
                >
                    Add Task
                </button>
                <div className={styles.wrapper}>
                    <h1 className={styles.header}>All Tasks</h1>
                    <ul className={styles.taskList}>
                        {tasks.map((task, index) => (
                            <li key={index} className={styles.taskItem}>
                                {task}
                                <button
                                    className={styles.completeButton}
                                    onClick={() => completeTask(index)}
                                >
                                    Complete
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => deleteTask(index)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className={styles.modalBackdrop}>
                        <div className={styles.modal}>
                            <h2>Add New Task</h2>
                            <input
                                type="text"
                                className={styles.inputField}
                                placeholder="Enter task"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                            <button
                                className={styles.modalButton}
                                onClick={handleAddTask}
                            >
                                Add
                            </button>
                            <button
                                className={styles.modalCloseButton}
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default HomePage;
