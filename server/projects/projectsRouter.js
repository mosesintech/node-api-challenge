const express = require('express');
const Projects = require('../data/helpers/projectModel');
const router = express();

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `Error creating new post: ${error}`});
        })
});

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({errorMessage: error});
        })
});

router.get('/:id', validateProjectsID, (req, res) => {
    res.status(200).json(req.project);
})

router.get('/:id/actions', validateProjectsID, (req, res) => {
    Projects.getProjectActions(req.project.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `Error receiving project actions: ${error}`});
        })
})

router.put('/:id', validateProjectsID, validateProject, (req, res) => {
    const id = req.project.id;
    const changes = req.body;
    Projects.update(id, changes)
        .then(updated => {
            res.status(200).json(updated);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `Error updating project: ${error}`});
        })
});

router.delete('/:id', validateProjectsID, (req, res) => {
    Projects.remove(req.project.id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `Error deleting project: ${error}`});
        })
});

// Middleware

function validateProjectsID (req, res, next) {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if(project){
                req.project = project;
                next();
            } else {
                res.status(404).json({message: `ID not found`});
            }
        })
        .catch(error => {
            res.status(500).json({message: `Error validating ID: ${error}`});
        })
}

function validateProject(req, res, next) {
   const { name, description } = req.body;
   if(!req.body) {
       res.status(400).json({message: "Missing body."})
   } else if(!name || !description){
     res.status(400).json({ message: "Missing name or description." });
   } else {
       next();
   }
 }

module.exports = router;