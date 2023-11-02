import express from 'express';
import indexRouter from './routes/index.mjs';
import galeryRouter from './routes/gallery.mjs';
import viewerRouter from './routes/viewer.mjs';
import contactRouter from './routes/contact.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
// Middleware setup (if needed)
// app.use(someMiddleware);

// Define your routes
app.use('/', indexRouter);
app.use('/galery', galeryRouter);
app.use('/viewer', viewerRouter);
app.use('/contact', contactRouter); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
