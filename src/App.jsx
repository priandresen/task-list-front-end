import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import tasksData from './data/tasksData.js';
import axios from 'axios';


const kbaseURL = 'http://localhost:5000';


const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then(response => response.data)
    .catch(error => console.error(error));
};

const convertFromAPI = (apiTask) => {
  const newTask = {
    ...apiTask,
    // goal: apiTask.goal ? apiTask.goal : 'Unknown',
    // goalId: apiTask.goal_id ? apiTask.goal_id : null,
    isComplete: apiTask.is_complete,
  };

  delete apiTask.is_complete;
  // delete apiTask.goal_id;
  return newTask;
};

const onCompleteTaskAPI = (id) => {
  return axios
    .patch(`${kbaseURL}/tasks/${id}/mark_complete`)
    .catch((error) => console.error(error));
};

const onRemoveTaskAPI = (id) => {
  return axios
    .delete(`${kbaseURL}/tasks/${id}`)
    .catch((error) => console.error(error));
};


const App = () => {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    return getAllTasksAPI()
    .then((tasksFromAPI) => {
      const newTasks = tasksFromAPI.map(convertFromAPI);
      setTasks(newTasks);
    });
  };

  useEffect(() => {
    getAllTasks();
  }, []);


  const onCompleteTask = (id) => {
    onCompleteTaskAPI(id).then(() => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === id
            ? { ...task, isComplete: !task.isComplete }
            : task
        )
      );
    });
  };

 
  const onRemoveTask = (id) => {
    onRemoveTaskAPI(id).then(() => {
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList
          tasks={tasks}
          onCompleteTask={onCompleteTask}
          onRemoveTask={onRemoveTask}
        />
      </main>
    </div>
  );
};

export default App;