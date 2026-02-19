import type {Task} from '../App';
import TaskItem from './TaskItem';

interface TaskListProps{
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
}

function TaskList({tasks, onDeleteTask, onToggleTask}: TaskListProps){
  if(tasks.length===0){
    return <p className="text-muted">It's a holiday! Add Task?</p>;
  }
  return (
    <div>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onToggle={onToggleTask}
            />
          ))}
        </div>
    );
}
export default TaskList;