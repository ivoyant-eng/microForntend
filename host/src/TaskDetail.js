import React from "react";

const TaskDetail = ({ task }) => {
  return (
    <div>
      <h2>Task Detail</h2>
      {task ? (
        <div style={styles.taskItem}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ) : (
        <p>No task selected.</p>
      )}
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
};

export default TaskDetail;
