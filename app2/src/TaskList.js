import React from "react";

const TaskList = ({ tasks, setTasks }) => {
  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const renderTasks = () => {
    if (tasks.length === 0) {
      return <p>No tasks found.</p>;
    }

    return tasks.map((task) => (
      <div key={task.id} style={styles.taskItem}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <button
          type='button'
          onClick={() => handleTaskDelete(task.id)}
          style={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    ));
  };

  return (
    <div>
      <h2>Task List</h2>
      {renderTasks()}
    </div>
  );
};

const styles = {
  taskItem: {
    marginBottom: "1rem",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TaskList;
