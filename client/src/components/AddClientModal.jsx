import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {FaUser} from 'react-icons/fa';
import {ADD_CLIENT} from '../mutations/clientMutation'
import { GET_CLIENTS } from '../queries/clientQueries';
const AddClientModal=()=>{
    const [name, setName]=useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone]=useState('');
    const [addClient] = useMutation(ADD_CLIENT, {
        variables:{
            name:name,
            email:email,
            phone:phone
        }, 
        update(cache, {data:{addClient}}){
            const {clients} = cache.readQuery({
                query:GET_CLIENTS
            });
            cache.writeQuery({
                query:GET_CLIENTS, 
                data:{
                    clients:clients.concat([addClient])
                }
            });
        }

    })
    const onSubmit=(e)=>{
        e.preventDefault();
        if(name ==''||email==""||phone==""){
            return alert("Please fill all field")
        }
        addClient(name, email, phone);
        setName("");
        setEmail("");
        setPhone("");
    }
    return(
       <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
                
                <div className="d-flex align-items-center">
                    <FaUser className="icon"/>
                    <div>Add Client</div>
                </div>
                
            </button>

            <div className="modal fade" id="addClientModal"  aria-labelledby="addClientModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={onSubmit} action="" method="post">
                        <label htmlFor="" className="form-label">Name</label>
                        <input type="text" name="name" id="name" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />

                        <label htmlFor="" className="form-label">Email</label>
                        <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />

                        <label htmlFor="" className="form-label">Phone</label>
                        <input type="text" name="phone" id="phone" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                        <button data-bs-dismiss="modal" type="submit" className="btn btn-secondary mt-2">Add Client</button>
                    </form>
                </div>
                
                </div>
            </div>
            </div>
       </>
    )
}
export default AddClientModal;