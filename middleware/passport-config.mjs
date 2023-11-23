import bcrypt from 'bcrypt';
import localStrategy from 'passport-local';
import { pool } from '../db.mjs';

const Strategy = localStrategy.Strategy;

export default function(passport) {
  const authenticateUser = (username, password, done) => {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, results) => {
      if (err) { throw err; }

      if (results.rows.length > 0) {
        const user = results.rows[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) { throw err; }

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password is incorrect' });
          }
        });
      } else {
        return done(null, false, { message: 'No user with that username' });
      }
    });
  };

  passport.use(new Strategy({ usernameField: 'username' }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
      return done(err, results.rows[0]);
    });
  });
}
