const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // your database file
const middlewares = jsonServer.defaults();

// Use json-server-auth as a middleware
server.use(middlewares);
server.use(auth);
server.use(router);

// Start the server
server.listen(3000, () => {
    console.log('JSON Server is running on http://localhost:3000');
});