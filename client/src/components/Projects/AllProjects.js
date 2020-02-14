import React, {useState, useEffect} from 'react';
import Project from './Project';
import axios from 'axios';

function AllProjects() {
const [projects, setProjects] = useState([]);

useEffect(() => {
    axios.get('http://localhost:8000/api/projects')
        .then(res => {
        setProjects(res.data);
        })
        .catch(error => {
        console.log("You broke it all!", error)
        })
    }, []);

    return (
        <div className="landing">
            <h2>All Projects</h2>
            <hr />
            {projects.map( (projects, index) => <Project key={index} project={projects.name} id={projects.id} />)}
        </div>
    );
}

export default AllProjects;