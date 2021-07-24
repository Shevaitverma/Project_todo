import React, { useState } from "react";

const Edit = ({ todo }) => {

    const [description , setDescription] = useState(todo.description);

    //edit description function ....
    const updateDescription = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    console.log(todo.todo_id);
    return(
        <>
        <button 
            type="button" 
            class="Edit_button" 
            data-toggle="modal" 
            data-target={`#id${todo.todo_id}`}>
                =
        </button>
        
        {/*
            id = id<integer Or number>
        */}
        <div class="modal" id={`id${todo.todo_id}`}>
            <div class="modal-dialog">
                <div class="modal-content">
                    
                    <div class="modal-header">
                    <h4 class="modal-title">Edit</h4>
                    <button 
                        type="button" 
                        class="close_button"
                        data-dismiss="modal" 
                        onClick={()=> setDescription(todo.description)}>
                            &times;
                    </button>
                    </div>
                    
                    <div class="modal-body">
                        <input 
                            type='text' 
                            className='form-control' 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    
                    <div class="modal-footer">
                    <button 
                        type="button" 
                        class="Edit_footer" 
                        data-dismiss="modal" 
                        onClick={e => updateDescription(e)}>
                            Edit
                    </button>
                    <button 
                        type="button" 
                        class="Close_footer" 
                        data-dismiss="modal"
                        onClick={()=> setDescription(todo.description)}>
                            Close
                    </button>
                    </div>

    </div>
  </div>
</div>
        </>
    )
}

export default Edit;
