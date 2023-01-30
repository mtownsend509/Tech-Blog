const express = require('express');
const { Profile, Blogpost, Comments } = require('../Models');
const router = express.Router();

const withAuth = require('../Utils/Auth');

router.get('/', async (req, res) => {
    Blogpost.findAll({
        attributes: [
            'id',
            'title',
            'post',
            'created_at'
        ],
        include: [
            {
                model: Profile,
                attributes: ['username', 'id']
            },
        ],
    })
    .then(Data => {
        const blogpost = Data.map(blogdata => blogdata.get({ plain: true}));
        console.log(blogpost);
        res.render('Homepage', {
            blogpost,
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.get('/profile', async (req, res) => {
    res.render('profile');
})

router.get('/login', async (req, res) => {
    res.render('login');
})

module.exports = router;
