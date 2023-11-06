import 'dotenv/config'; // for environment variables
import logClientIP from './ipLogger.mjs'; // ip logger middleware
import express from 'express'; // for routing
import { createUsersTable } from './db.mjs'; // for database setup

// Import your routes here
import indexRouter from './routes/index.mjs';
import galleryRouter from './routes/gallery.mjs'; // Corrected route name
import viewerRouter from './routes/viewer.mjs';
import contactRouter from './routes/contact.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Database setup
createUsersTable(); // call the function to create the user table

// Use the custom middleware to log client IP globally
app.use(logClientIP);


// Define your routes
app.use('/', indexRouter);
app.use('/gallery', galleryRouter); 
app.use('/viewer', viewerRouter);
app.use('/contact', contactRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});