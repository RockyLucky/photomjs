// routes/gallery.mjs
import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
    fs.readdir('./public/images', (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Something went wrong');
        } else {
            res.render('gallery', { title: 'Image', images: files });
        }
    });
});

export default router;
