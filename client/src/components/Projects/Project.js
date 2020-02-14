import React from 'react';
import {Link} from 'react-router-dom';

function Project(props) {
    return (
        <div>
            <p><Link to={`/projects/${props.id}`} style={{textDecoration: "none"}}>{props.project}</Link></p>
        </div>
    );
}

export default Project;