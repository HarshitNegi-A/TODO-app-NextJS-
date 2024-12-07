import React, { useState } from "react";
import Header from "./Header";
import styles from "./HomePage.module.css";

const HomePage = (props) => {
  const [tasks, setTasks] = useState(props.initialTasks);
  const [newTask, setNewTask] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = async () => {
    // if (newTask.trim() !== '') {
    //     const res = await fetch('/api/tasks/add', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ task: newTask }),
    //     });
    //     const data = await res.json();

    setTasks([...tasks, { task: newTask }]);
    setNewTask("");
    setShowModal(false);

    props.onAdd(newTask);
    // }
  };

  const handleCompleteTask = async (index) => {
    
    const taskId = tasks[index]._id;
    
    // const res = await fetch("/api/tasks/complete", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ taskId }),
    // });
    // const data = await res.json();
   
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
      props.onComplete(taskId)
    
  };

  const handleDeleteTask = async (index) => {
    const taskId = tasks[index]._id;
   
    // const res = await fetch("/api/tasks/delete", {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ taskId }),
    // });
    // const data = await res.json();
    
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
      props.onDelete(taskId)
  };

  return (
    <>
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
            {tasks && tasks.length > 0 ? (
              tasks.map((task, index) => (
                <li key={index} className={styles.taskItem}>
                  {task.task}
                  <button
                    className={styles.completeButton}
                    onClick={() => handleCompleteTask(index)}
                  >
                    Complete
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No tasks available</p>
            )}
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
              <button className={styles.modalButton} onClick={handleAddTask}>
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
    </>
  );
};

export default HomePage;
