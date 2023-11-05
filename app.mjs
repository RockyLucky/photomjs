import 'dotenv/config'; // for environment variables
import express from 'express';
import session from 'express-session'; // Import session

import pg from 'pg'; // for database connection
import pgSession from 'connect-pg-simple'; // for session storage in the database

// Import your routes here
import indexRouter from './routes/index.mjs';
import galleryRouter from './routes/gallery.mjs'; // Corrected route name
import viewerRouter from './routes/viewer.mjs';
import contactRouter from './routes/contact.mjs';
import adminRouter from './routes/admin/admin.mjs';

const app = express();
const port = process.env.PORT || 3000;

// Setup session storage
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Session configuration using connect-pg-simple
const pgSessionStore = new (pgSession(session))({
  pool,
  tableName: 'session', // Customize the session table name if needed
});

app.use(
  session({
    store: pgSessionStore, // Use the pgSessionStore object
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 day
  })
);


app.set('view engine', 'ejs');
app.use(express.static('public'));

// Define your routes
app.use('/', indexRouter);
app.use('/gallery', galleryRouter); 
app.use('/viewer', viewerRouter);
app.use('/contact', contactRouter);

// Admin routes
app.use('/admin', adminRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
