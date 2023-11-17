import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('contact.ejs', { title: 'Contact' })
});

export default router;
