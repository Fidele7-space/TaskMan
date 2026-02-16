import React, { useState } from 'react';
//props
interface Props{
    onAddTask: (title: string, deadline: Date)=> void;
}

function AddTask({onAddTask}: Props){

    const [title, setTitle]=useState('');
    const [deadline, setDeadline]= useState("");

   //submission handling
    const submitHandling = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !deadline) return; //empty tasks are not allowed

        onAddTask(title, new Date(deadline));

        //form clearing
        setTitle("");
        setDeadline("");
    };
    return(
        <form onSubmit={submitHandling} className="mb-3 d-flex gap-2">
            <input id="taskTitle" type="text" value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className="form-control"
            placeholder='Enter a new task...'/>

            //Deadline selector
            <input type="date" value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className='form-control' />

            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    );
}
export default AddTask;
