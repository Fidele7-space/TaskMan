import React, { useState } from 'react';
//props
interface Props{
    onAddTask: (title: string, deadline: Date)=> void;
}

function AddTask({onAddTask}: Props){

    const [inputValue, setInputValue]=useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value);

    };
    const submitHandling = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) return; //empty tasks are not allowed
        onAddTask(inputValue, new Date());

        setInputValue("");
    };
    return(
        <form onSubmit={submitHandling} className="mb-3 d-flex gap-2">
            <input id="taskTitle" type="text" value={inputValue}
            onChange={handleChange} className="form-control"
            placeholder='Enter a new task...'/>
            <button type="submit" className="btn btn-primary">Add</button>
        </form>
    );
}

export default AddTask;
