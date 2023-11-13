// Import the necessary modules
import express from 'express';
import { albums, readAlbumsDir } from '../middleware/albums.mjs';

// Create a router instance
const router = express.Router();

// Define the middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, call the next middleware function
    return next();
  }
  // If the user is not authenticated, redirect to the login page
  res.redirect('/login');
};

// Define the dashboard route and use the isAuthenticated middleware
router.get('/', isAuthenticated, (req, res) => {
  readAlbumsDir(); // read the albums directory
  // Render the dashboard view
  res.render('dashboard.ejs');
});

router.get('/albums', isAuthenticated, (req, res) => {
  // Render the albums view
  readAlbumsDir(); // read the albums directory
  res.render('admin_albums.ejs' , {albums: albums});
});


// Export the router
export default router;
