import type {Task} from '../App';
import TaskItem from './TaskItem';

interface Props{
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
}

function TaskList({tasks, onDeleteTask, onToggleTask}: Props){
  if(tasks.length===0){
    return <p className="text-muted">It's a holiday! Add Task?</p>;
  }
  return (
      <div className="row g-3">
        {tasks.map(task =>(
          //responsive grid diplay
          <div key={task.id} className="col-12 col-md-6 col-lg-4">
            <TaskItem task={task} 
                      onDelete={onDeleteTask}
                      onToggle={onToggleTask}
             />
            </div>
        ))}
      </div>
    );
}
export default TaskList;