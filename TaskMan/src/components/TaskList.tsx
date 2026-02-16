import type {Task} from '../App';

interface Props{
  tasks: Task[];
}

function TaskList({tasks}: Props){
  if(tasks.length===0){
    return <p className="text-muted">It's a holiday! Add Task?</p>;
  }
  return (
      <ul className="list-group">
        {tasks.map((task)=>(
          <li
            key={task.id} 
            className='list-group-item d-flexv justify-content-between align-items-center'>
              <div>
                <strong>{task.title}</strong>
                <br/>
                <small>Due: {task.deadline.toLocaleDateString()}</small>
              </div>
          
            <span className={'badge ${task.completed? "bg-success": "bg-warning text-dark"}'}>
              {task.completed? "Completed": "Pending"}
            </span>
          </li>
          ))}
    </ul>
    );
}

export default TaskList;