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

    setTasks([...tasks, newTask]);
  };
    const deleteTask = (id: string) =>{
      setTasks(tasks.filter(task => task.id !== id));
    };
    const toggleTask = (id: string)=>{
      setTasks(tasks.map(t=>
        t.id===id?{...t, completed: !t.completed}:t
      ));
    };

  return(
    /**Bootstrap Container*/
    <div className='container mt-4'>
      <h1 className='mb-4'>STaskMan</h1>

      <AddTask onAddTask={addTask} />

       <TaskList tasks={tasks} 
       onDeleteTask={deleteTask} 
       onToggleTask={toggleTask}/>
    </div>
  );
}

export default App;