// routes/login.mjs
import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login.ejs');
});

router.post('/', 
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default router;