const express = require('express');
const cors = require('cors');
const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');
const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: `Welcome to Moses' API! Be sure to check out /api/projects and /api/actions!`});
})

server.get('/api', (req, res) => {
    res.status(200).json({message: `Looks like you might be looking for /api/projects or /api/actions`});
})

module.exports = server;