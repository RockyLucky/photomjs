// routes/login.mjs
import express from 'express';
import passport from 'passport';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login.ejs');
});

router.post('/', [
  check('username').isLength({ min: 5 }),
  check('password').isLength({ min: 5 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  passport.authenticate('local', {
    successRedirect: process.env.SUCCESS_REDIRECT || '/',
    failureRedirect: process.env.FAILURE_REDIRECT || '/login',
    failureFlash: true
  })(req, res, next);
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default router;