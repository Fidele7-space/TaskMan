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
    const badgeClass ={
        completed: 'bg-success text-white',
        pending: 'bg-warning text-dark',
        ongoing: 'bg-info text-dark',
        overdue: 'bg-danger text-white',
        }[status] || 'bg-secondary';

return(
    <div className='card border-0 shadow-sm'>
        <div className='card-body'>
            <div className='d-flex justify-content-between -align-items-start mb-1'>
                <h4 className='card-title mb-0'>{task.title}</h4>
                <span className={`badge ${badgeClass}`}>{status}</span>
            </div>
            <small className='text-muted d-block mb-2'>
                Due: {new Date(task.deadline).toLocaleDateString()}
            </small>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='form-check-input'>
                    <input 
                    type="checkbox" 
                    className='form-check-input'
                    checked={task.completed}
                    onChange={()=> onToggle(task.id)} 
                    id={`task-${task.id}`}
                    />
                <label className='form-check-label small'
                htmlFor={`task-${task.id}`} >
                    Mark as completed
                </label>
            </div>
       
            <button className= "btn btn-sm btn-outline-danger"
                    onClick={()=> onDelete(task.id)} 
            >Delete</button>
        </div>
    </div>
    </div>
);
}
export default TaskItem;