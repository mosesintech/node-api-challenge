import React from 'react';

 function ActionList(props) {
     return(
         <div className="landing">
             <h2>{props.description}</h2>
             <p>Notes: {props.notes}</p>
         </div>
     );
 }

 export default ActionList; 