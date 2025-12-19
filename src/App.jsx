import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
// import tasksData from './data/tasksData.js';
import NewTaskForm from './components/NewTaskForm.jsx'; 
import axios from 'axios';


const kbaseURL = 'http://127.0.0.1:5000';


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



//////////////
const onCompleteTaskAPI = (id) => {
  return axios
    .patch(`${kbaseURL}/tasks/${id}/mark_complete`)
    .catch((error) => console.error(error));
};

const onIncompleteTaskAPI = (id) => {
  return axios
    .patch(`${kbaseURL}/tasks/${id}/mark_incomplete`)
    .catch((error) => console.error(error));
};
///////////////


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



  const onCompleteChangeTask = (id) => {
    if (tasks.find((task) => task.id === id).isComplete) {
      return onIncompleteTaskAPI(id).then(() => {
        setTasks((tasks) =>
          tasks.map((task) =>
            task.id === id
              ? { ...task, isComplete: !task.isComplete }
              : task
          )
        );
      });
    }
    return onCompleteTaskAPI(id).then(() => {
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

  const onHandleSubmit = (newTask) => {
    return axios.post(`${kbaseURL}/tasks`, newTask)
      .then((response) => {
        setTasks((tasks) => [...tasks, convertFromAPI(response.data)]); 
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <NewTaskForm onHandleSubmit={onHandleSubmit}/>
        <TaskList
          tasks={tasks}
          onCompleteTask={onCompleteChangeTask}
          onRemoveTask={onRemoveTask}
        />
      </main>
    </div>
  );
};

export default App;