import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';
import tasksData from './data/tasksData.js';



const App = () => {
  const [tasks, setTasks] = useState(tasksData);

  const onCompleteTask = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete};
      }
      return task;
    }));
  };



  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            onCompleteTask={onCompleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
