import React, { useState } from 'react';
import Header from './Header';
import styles from './CompletedTask.module.css';

const CompletedTask = (props) => {
    const [completedTasks, setCompletedTasks] = useState(props.initialCompletedTasks);

    return (
        <>
            <Header />
            <div className={styles.body}>
                <h1 className={styles.header}>Completed Tasks</h1>
                <ul className={styles.completedTaskList}>
                    {completedTasks && completedTasks.length>0 ?(completedTasks.map((task, index) => (
                        <li key={index} className={styles.completedTaskItem}>
                            {task.task}
                        </li>
                    ))) : (
                        <p>No tasks available</p>
                      )}
                    
                </ul>
            </div>
        </>
    );
};



export default CompletedTask;
