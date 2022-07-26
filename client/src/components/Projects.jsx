import Spinner from './Spinner';
import React from 'react';
import {useQuery} from '@apollo/client';
import ProjectCard from './ProjectCard';
import { GET_PROJECTS } from '../queries/projectQueries';
const Projects=()=>{
    const {loading, error, data} = useQuery(GET_PROJECTS);
    if(loading){
        return <Spinner/>
    }
    if(error){
        return(
            <div>something went wrong</div>
        )
    }
    return(
        <>
            {
                data.projects.length>0?
                (<div className='row mt-5'>
                    {data.projects.map(mm=>{
                        return(
                           <ProjectCard key={mm.id} project={mm}/>
                        )
                    })}
                    </div>
                ):
                (<p>NO projects</p>)
               
            }
        </>
    )
}
export default Projects;