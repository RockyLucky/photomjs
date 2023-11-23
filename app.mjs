import dotenv from 'dotenv'; // for environment variables
import logClientIP from './middleware/ipLogger.mjs'; // ip logger middleware
import express from 'express'; // for routing
import passport from 'passport';
import bodyParser from 'body-parser';
import initializePassport from './middleware/passport-config.mjs';
import session from 'express-session';
import flash from 'connect-flash';
import { createUsersTable } from './db.mjs'; // for database setup
import { createUser } from './middleware/create_user.mjs'; // Import the user creation function

// Import your routes here
import indexRouter from './routes/index.mjs';
import albumRouter from './routes/album_viewer.mjs';
import contactRouter from './routes/contact.mjs';
import loginRouter from './routes/login.mjs';
import dashboardRouter from './routes/dashboard.mjs';
import testupload from './routes/test-upload.mjs';

const app = express();
const port = process.env.SERVER_PORT || 3000;

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

createUser("testuser", "password123"); // call the function to create the user

// Use the custom middleware to log client IP globally
app.use(logClientIP);

// Middleware to pass copyright text to all views
app.use((req, res, next) => {
  res.locals.copyright = process.env.COPYRIGHT_TEXT;
  next();
});

// Define your routes
app.use('/', indexRouter);
app.use('/album', albumRouter); 
app.use('/contact', contactRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/upload', testupload);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});