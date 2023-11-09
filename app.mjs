import dotenv from 'dotenv'; // for environment variables
import logClientIP from './ipLogger.mjs'; // ip logger middleware
import express from 'express'; // for routing
import passport from 'passport';
import bodyParser from 'body-parser';
import initializePassport from './passport-config.mjs';
import session from 'express-session';
import flash from 'connect-flash';
import { createUsersTable } from './db.mjs'; // for database setup
import { createUserIfNotExists } from './create_user.mjs'; // Import the user creation function

// Import your routes here
import indexRouter from './routes/index.mjs';
import galleryRouter from './routes/gallery.mjs'; // Corrected route name
import viewerRouter from './routes/viewer.mjs';
import contactRouter from './routes/contact.mjs';
import loginRouter from './routes/login.mjs';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

initializePassport(passport); // call the function to initialize passport

// Database setup
createUsersTable(); // call the function to create the user table
console.log('Database setup complete');

// setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
// Passport authentication setup
app.use(passport.initialize());
app.use(passport.session());

createUserIfNotExists(); // call the function to create the user

// Use the custom middleware to log client IP globally
app.use(logClientIP);

// Define your routes
app.use('/', indexRouter);
app.use('/gallery', galleryRouter); 
app.use('/viewer', viewerRouter);
app.use('/contact', contactRouter);
app.use('/login', loginRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});