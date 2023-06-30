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

  return (
    <div className=''>
      <h1 className=''>App 2</h1>
      <TaskDetail />
      <React.Suspense fallback='Loading'>
        <MFE2_TaskList tasks={tasks} setTasks={setTasks} />
      </React.Suspense>
      <React.Suspense fallback='Loading Button'>
        <MFE1_TaskCreation
          title={title}
          description={description}
          setDescription={setDescription}
          setTitle={setTitle}
        />
        {/* <MFE2_TaskList /> */}
      </React.Suspense>
    </div>
  );
}

export default App;
