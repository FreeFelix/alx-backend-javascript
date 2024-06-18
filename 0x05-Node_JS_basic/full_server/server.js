import express from 'express';
import mapRoutes from './routes';

// Create a new Express application
const app = express();

// Define the port on which the server will listen
const PORT = 1245;

// Map the routes to the application
mapRoutes(app);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export default app;
module.exports = app;
