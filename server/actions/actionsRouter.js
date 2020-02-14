const express = require('express');
const Actions = require('../data/helpers/actionModel');
const router = express();

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `Error creating new action: ${error}`});
        })
});

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `Error retrieving actions: ${error}`});
        })
})

router.get('/:id', validateActionsID, (req, res) => {
    res.status(200).json(req.action);
})

router.put('/:id', validateActionsID, validateAction, (req, res) => {
    const id = req.action.id;
    const changes = req.body;
    Actions.update(id, changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `Error updating action: ${error}`});
        })
})

router.delete('/:id', validateActionsID, (req, res) => {
    Actions.remove(req.action.id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `Error deleting action: ${error}`});
        })
})

// Middleware

function validateActionsID (req, res, next) {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if(action){
                req.action = action;
                next();
            } else {
                res.status(404).json({message: `ID not found`});
            }
        })
        .catch(error => {
            res.status(500).json({message: `Error validating ID: ${error}`});
        })
}

function validateAction(req, res, next) {
   const { project_id, description, notes } = req.body;
   if(!req.body) {
       res.status(400).json({message: "Missing body."})
   } else if(!project_id) {
       res.status(404).json({message: `Project ID does not exist.`})
   } else if(!description || !notes){
     res.status(400).json({ message: "Missing notes or description." });
   } else {
       next();
   }
 }

module.exports = router;