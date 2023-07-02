# Getting Started with Microfrontend with Module Federation

## 1. Creating MicroFrontend Project Locally.

In this we create three React application App1, App2 and Host. Host is responsible for Keeping rendering all the components comming from the other applications.

```bash
npx create-react-app app1
cd app1
yarn add webpack webpack-cli webpack-server html-webpack-plugin babel-loader webpack-dev-server

npx create-react-app app2
cd app2
yarn add webpack webpack-cli webpack-server html-webpack-plugin babel-loader webpack-dev-server 

npx create-react-app host
cd host
yarn add webpack webpack-cli webpack-server html-webpack-plugin babel-loader webpack-dev-server 

``` 

## 2. Add Bootstrap,js to all

* In each file rename the `index.js` to `bootstrap.js`. 
* Create a new index.js file for in the root directory like below.

```js
//index.js
import('./bootstrap');
```
We do this step to make bootstrap load asynchronously. It is needed for Host to wait for Webpack to fetch components from App1 and App2.



**Note**: Remove all the code related to webVitals and css if you don't need it.

## 3. Creating Components.

In App1 we create a component `TaskCreation.js` which will be responsible for creating the Task to the state.

```js
//TaskCreation.js
import React from "react";

const TaskCreation = ({
  title,
  description,
  setTitle,
  setDescription,
  handleAdd,
}) => {

  return (
    <div>
      <h2>Task Creation - App1</h2>
      <form onSubmit={handleAdd} style={styles.form}>
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

```

Doing the same for the **App2** which has `TaskList.js`

```js
//TaskList 

import React from "react";

const TaskList = ({ tasks, setTasks, handleViewDescription }) => {
  const handleTaskDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
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
```

We gone ahead and added a additional component in the host called `TaskDetail.js` which will be responsible for viewing the Tasks.

```js

import React from "react";

const TaskDetail = ({ task }) => {
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

```

## 4. Adding Webpack config to Remotes and Host.

Remotes here are App1 and App2.

```js

// app1/webpack.config.js

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
module.exports = {
  mode: "development",
  devServer: {
    port: 8083,
  },
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,
        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,
        // To Use babel Loader
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env" /* to transfer any advansed ES to ES5 */,
            "@babel/preset-react",
          ], // to compile react to ES5
        },
      },
    ],
  },
  // Logic for Exposing the Components
  plugins: [
    new ModuleFederationPlugin({
      name: "MFE1", // <--- Name of the Application 
      filename: "remoteEntry.js",
      exposes: {
        // Exposes two components MyButton and TeaskCreation
        "./MyButton": "./src/MyButton",
        "./TaskCreation": "./src/TaskCreation",
      },
      shared: {
        ...deps,
        react: {
          eager: true,
        },
        ["react-dom"]: {
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

```
Same configuration can be followed for the App2 `webpack.config.js` .

**Host** `webpack.config.js`

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
  mode: "development",
  devServer: {
    port: 8081,
  },
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,
        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,
        // To Use babel Loader
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env" /* to transfer any advansed ES to ES5 */,
            "@babel/preset-react",
          ], // to compile react to ES5
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "MFE3",
      filename: "remoteEntry.js",
      remotes: {
        MFE1: "MFE1@http://localhost:8083/remoteEntry.js",
        MFE2: "MFE2@http://localhost:8082/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
```
**Note**:In remotes if you notice we used the name in the url `"MFE1@http://localhost:8083/remoteEntry.js",` and this name should be same which name you have written in the remote's webpack config.

![](https://miro.medium.com/v2/resize:fit:1400/0*6wyDUM_4LHmmZgyW)

## 5. Import your applications

Import the Applications component form the remote to Host application.

Here we are using Lazy loading to import the application.

```jsx
const MFE2_TaskList = React.lazy(() => import("MFE2/TaskList"));
const MFE1_TaskCreation = React.lazy(() => import("MFE1/TaskCreation"));
```

once imported we are going to wrap them into a `suspense` for any laoding and erorr handling gracefully.

```jsx
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
```

Our final host's `app.js` looks like below.

```jsx
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
```

## 6. Run the Application

To run the application.

```bash
yarn webpack serve
```

You will have a running application.

## What's next?

1. [Different ways of handling state with Module Federation](https://www.youtube.com/watch?v=njXeMeAu4Sg)
2. [Building multi Frameworks with Module Federation and webcomponent](https://www.youtube.com/watch?v=oX7N3Pyo-T8) 



