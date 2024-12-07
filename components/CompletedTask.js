import React, { Fragment, useContext } from 'react';
import { TaskContext } from '../context/TaskContext'; // Import the context
import styles from './CompletedTask.module.css';
import Header from './Header';

const CompletedTask = () => {
    const { completedTasks } = useContext(TaskContext); // Directly use useContext to get completed tasks

    return (
        <Fragment>
            <Header />
            <div className={styles.body}>
                <h1 className={styles.header}>Completed Tasks</h1>
                {completedTasks.length === 0 ? (
                    <p>No tasks completed yet.</p>
                ) : (
                    <ul className={styles.completedTaskList}>
                        {completedTasks.map((task, index) => (
                            <li key={index} className={styles.completedTaskItem}>
                                <p>{task}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Fragment>
    );
};

export default CompletedTask;
