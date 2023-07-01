import React from "react";
import useStore from "MFE3/store";

const TaskDetail = () => {
  const { currentTask: task } = useStore();
  return (
    <div>
      <h2>Task Detail - App3 (Host) </h2>
      {task ? (
        <div style={styles.taskItem}>
          <h3>{task?.title}</h3>
          <p>{task?.description}</p>
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
