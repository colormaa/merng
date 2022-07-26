import React, {useState} from 'react'
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '../mutations/projectMutation';
import { GET_PROJECT } from '../queries/projectQueries';
const EditProjectForm=({project})=>{
    const [name, setName]=useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus]=useState(project.status);
    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables:{
            id: project.id,
            name, 
            description,
            status
        }, 
        refetchQueries:[{query: GET_PROJECT, variables: { id: project.id}}]

    });
    const onSubmit=(e)=>{
        e.preventDefault();
        if(name ==''||description==''||status==''){
            return alert("Please fill all fields");
        }
        updateProject( name, description,status)
    }
    return (
        <div className="mt-5">
            <h3>Update project detail</h3>

            <form onSubmit={onSubmit} action="" method="post">
                <label htmlFor="" className="form-label">Name</label>

                <input type="text" name="name" id="name" className="form-control" value={name} 
                onChange={(e)=>setName(e.target.value)} />

                <label htmlFor="" className="form-label">Description</label>

                <input type="text" name="description" id="description" className="form-control" 
                value={description} onChange={(e)=>setDescription(e.target.value)} />

                <label htmlFor="" className="form-label">Status</label>

                <select value={status} name="status" id="status" onChange={(e)=>{
                    setStatus(e.target.value);
                }} className="form-control">
                    <option value="new">Get Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                
                <button data-bs-dismiss="modal" type="submit" className="btn btn-secondary mt-2">Update Project</button>
            </form>
        </div>
  )
}

export default EditProjectForm