// routes/admin.mjs
import express from 'express';
import uploadRouter from './upload.mjs';

const adminRouter = () => {
  const router = express.Router();

  // Middleware to check if the user is logged in
  const isLoggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
      return next();
    }
    res.redirect('/admin/login');
  };

  // Admin login route
  router.get('/login', (req, res) => {
    // Implement your login form here
    res.send('Login form');
  });

  // Admin login POST route to handle authentication

  router.post('/login', (req, res) => {
    // Implement authentication logic here
    const authenticated = true; // Replace with actual authentication logic
    if (authenticated) {
      req.session.loggedIn = true;
      // Redirect to the admin dashboard or upload page
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/admin/login');
    }
  });

  // Admin dashboard route (requires login)
  router.get('/dashboard', isLoggedIn, (req, res) => {
    // Implement your admin dashboard here
    res.send('Admin dashboard');
  });

  // Admin image upload route (requires login)
  router.use('/upload', uploadRouter);

  return router;
};

export default adminRouter;