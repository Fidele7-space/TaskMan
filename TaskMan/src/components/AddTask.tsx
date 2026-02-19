import { useState } from 'react';
//props
export type FormEventType = React.FormEvent<HTMLFormElement>;
interface AddTaskProps{
    onAddTask: (title: string, deadline: Date)=> void;
}

function AddTask({onAddTask}: AddTaskProps){

    const [title, setTitle]=useState('');
    const [deadline, setDeadline]= useState("");

   //submission handling
    const submitHandling = (e: FormEventType) => {
        e.preventDefault();
        if (!title.trim() || !deadline) return; //empty tasks are not allowed

        onAddTask(title, new Date(deadline));

        //form clearing
        setTitle("");
        setDeadline("");
    };
    return(
        <form onSubmit={submitHandling} className="row g-2">
            <div className='col-md-6'>
                <input id="taskTitle" type="text" 
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                className="form-control"
                placeholder='Enter a new task...'
                />  
            </div>
            <div className='col-md-4'>
            <input type="date" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className='form-control' 
                />
            </div>
            <div className='col-md-2 d-grid'>
            <button type="submit" className="btn btn-primary">
                Add</button>
            </div>
        </form>
    );
}
export default AddTask;
