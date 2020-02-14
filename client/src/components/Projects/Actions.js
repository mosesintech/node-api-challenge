import React, {useState, useEffect} from 'react';
import ActionList from './ActionList'
import axios from 'axios';

function Actions(props) {
     const [actions, setActions] = useState([]);

     useEffect(() => {
         const id = props.match.params.id;
         axios.get(`http://localhost:8000/api/projects/${id}/actions`)
             .then(res => {
                 setActions(res.data);
             })
             .catch(err => {
                 console.log(err);
             })
     }, [props.match.params.id])

     if (!actions) {
         return <div>Loading post information...</div>;
       }

     return(
         <div>
             {actions.map( (actions, index) => <ActionList key={index} description={actions.description} notes={actions.notes} completed={actions.completed} /> )}
         </div>
     );
 }

 export default Actions; 