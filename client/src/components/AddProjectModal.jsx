import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {FaUser} from 'react-icons/fa';
import {ADD_PROJECT} from '../mutations/projectMutation'
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';
const AddProjectModal=()=>{
    const {data, loading, error} = useQuery(GET_CLIENTS);
    const [name, setName]=useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus]=useState('new');
    const [clientId, setClientId]=useState('')
    const [addProject] = useMutation(ADD_PROJECT, {
        variables:{
            name:name,
            description,
            status, 
            clientId
        }, 
        update(cache, {data:{addProject}}){
            const {projects} = cache.readQuery({
                query:GET_PROJECTS
            });
            cache.writeQuery({
                query:GET_PROJECTS, 
                data:{
                    projects:projects.concat([addProject])
                }
            });
        }

    })
    const onSubmit=(e)=>{
        e.preventDefault();
        if(name ==''||description==""||status==""){
            return alert("Please fill all field")
        }
        addProject(name, description, status, clientId);
        setName("");
        setDescription("");
        setStatus("new");
        setClientId("")
    }
    if(loading) return <Spinner/>
    if(error) return <p> error has occured</p>

    return(
       <>
       {!loading&&!error&&
       <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                
                <div className="d-flex align-items-center">
                    <FaUser className="icon"/>
                    <div>Add Project</div>
                </div>
                
            </button>

            <div className="modal fade" id="addProjectModal"  aria-labelledby="addProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="addProjectModalLabel">Add Project</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
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

                        <label htmlFor="" className='form-label'>Client</label>
                        <select value={clientId} name="clientId" id="clientId" onChange={(e)=>{
                            setClientId(e.target.value);
                        }} className="form-control">
                            <option value="">None</option>
                            {
                                data.clients.map(mm=>{
                                    return(
                                        <option key={mm.id} value={mm.id}>{mm.name}</option>
                                    )
                                })
                            }
                        </select>
                        
                        <button data-bs-dismiss="modal" type="submit" className="btn btn-secondary mt-2">Add Project</button>
                    </form>
                </div>
                
                </div>
            </div>
        </div>
       </>}
            
       </>
    )
}
export default AddProjectModal;