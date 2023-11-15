// routes/index.mjs
import express from 'express';
import { albums } from '../middleware/albums.mjs';

const router = express.Router();

// Define a route and its handler
router.get('/', (req, res) => {
  // Render the index view
  res.render('index.ejs' , {title: 'Home', albums: albums});
});

export default router;
