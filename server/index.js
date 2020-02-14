require('dotenv').config();
const server = require('./server');
const port = process.env.PORT;

server.listen(8000, () => {
    console.log(`API is running on ${port}`);
})