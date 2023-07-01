import React from "react";
import useStore from "MFE3/store";

const TaskList = ({ handleViewDescription }) => {
  const { tasks, setCurrentTask, removeTask } = useStore();
  const handleTaskDelete = (taskId) => {
    // const updatedTasks = tasks.filter((task) => task.id !== taskId);
    // setTasks(updatedTasks);
    removeTask(taskId);
  };

  const renderTasks = () => {
    if (tasks.length === 0) {
      return <p>No tasks found.</p>;
    }

    return tasks.map((task) => (
      <div
        key={task.id}
        style={styles.taskItem}
        onClick={(e) => {
          handleViewDescription(e, task);
        }}
      >
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
      <h2>Task List - App2</h2>
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
