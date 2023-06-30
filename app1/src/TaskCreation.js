import React from "react";

const TaskCreation = ({ title, description, setTitle, setDescription }) => {
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle task creation logic here
    console.log("New task created:", title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h2>Task Creation</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor='title' style={styles.label}>
          Title:
        </label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <label htmlFor='description' style={styles.label}>
          Description:
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <button type='submit' style={styles.button}>
          Create Task
        </button>
      </form>
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    margin: "0 auto",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    marginBottom: "1rem",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minHeight: "100px",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TaskCreation;
