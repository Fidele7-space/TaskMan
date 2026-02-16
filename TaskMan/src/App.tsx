import { useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.css';

export interface Task{
  id: string;
  title: string;
  completed: boolean;
  deadline: Date;
}

function App() {

  const [tasks, setTasks]= useState<Task[]>([]);

  const addTask = (title: string, deadline: Date) =>{
    const newTask: Task={
      id: crypto.randomUUID(),
      title,
      completed: false,
      deadline,
    };

    setTasks((prevTasks)=>[...prevTasks, newTask]);
  };

  return(
    /**Bootstrap Container*/
    <div className='container mt-4'>
      <h1 className='mb-4'>STaskMan</h1>

      <AddTask onAddTask={addTask} />

      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;