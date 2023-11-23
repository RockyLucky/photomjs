import { uploadFilesMiddleware } from '../middleware/upload_files.mjs';
import express from 'express';

const testupload = express();

// Render the upload.ejs file
testupload.get('/', (req, res) => {
    res.render('upload.ejs');
});

// Handle the POST request
testupload.post('/', uploadFilesMiddleware, (req, res) => {
    res.send('Files uploaded successfully');
});

export default testupload;