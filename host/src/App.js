import TaskDetail from "./TaskDetail";
import React, { useState } from "react";

const MFE2_TaskList = React.lazy(() => import("MFE2/TaskList"));
const MFE1_TaskCreation = React.lazy(() => import("MFE1/TaskCreation"));

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([
    { id: "one", title: "Zero Task", description: "This is description" },
  ]);
  const [currentTask, setCurrentTask] = useState();

  const handleAddTask = (e) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(2, 8);
    const newTask = {
      id,
      title,
      description,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const handleViewDescription = (e, task) => {
    e.preventDefault();
    setCurrentTask(task);
  };

  return (
    <div className=''>
      <h1 className=''>Host</h1>

      <React.Suspense fallback='Loading Button'>
        <MFE1_TaskCreation
          title={title}
          description={description}
          setDescription={setDescription}
          setTitle={setTitle}
          handleAdd={handleAddTask}
        />
      </React.Suspense>
      <React.Suspense fallback='Loading'>
        <MFE2_TaskList
          tasks={tasks}
          setTasks={setTasks}
          handleViewDescription={handleViewDescription}
        />
      </React.Suspense>
      <TaskDetail task={currentTask} />
    </div>
  );
}

export default App;
