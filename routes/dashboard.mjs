// Import the necessary modules
import express from 'express';
import '../middleware/albums.mjs';

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
  // Render the dashboard view
  res.render('dashboard.ejs');
});

router.get

// Export the router
export default router;
