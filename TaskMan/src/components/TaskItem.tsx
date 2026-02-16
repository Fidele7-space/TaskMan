import type {Task} from '../App';

interface Props{
    task: Task;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

function getStatus(task: Task): 'pending' | 'ongoing' | 'overdue' | 'completed' {
  if (task.completed) return 'completed';

  const today = new Date();
  const deadline = new Date(task.deadline);

  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  if (deadline.getTime() === today.getTime()) return 'ongoing';
  if (deadline.getTime() > today.getTime()) return 'pending';
  return 'overdue';
}

function TaskItem({task, onDelete, onToggle}: Props){
    const status = getStatus(task);
    const statusClass ={
        completed: 'bg-success text-white',
        pending: 'bg-warning',
        ongoing: 'bg-info text-white',
        overdue: 'bg-danger text-white',
        }[status];

return(
    <div className={`card p-3 shadow-sm ${statusClass}`}>
        {/*Task Title*/}
        <h4 className="mb-1">{task.title}</h4>
        <small className="mb-2">
            Due: {new Date(task.deadline).toLocaleString()}
        </small>
        <div className='d-flex justify-content-between
        align-items-center mt-2'>
            <input type="checkbox"
            checked={task.completed}
            onChange={()=> onToggle(task.id)} />
        </div>
        <button className= "btn btn-sm btn-dark"
                onClick={()=> onDelete(task.id)} 
        >Delete</button>
    </div>
);
}
export default TaskItem;