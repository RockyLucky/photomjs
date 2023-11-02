import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('contact', { title: 'Contact' })
});

export default router;
