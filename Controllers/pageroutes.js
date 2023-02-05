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

router.get('/dashboard', async (req, res) => {
    Blogpost.findAll({
        where: {
            profile_id: 1
        },
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
        res.render('dashboard', {
            blogpost,
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.get('/post/:id', async (req, res) => {
    let id = req.params.id
    Blogpost.findOne({
        where: {
            // id: req.params.id
            id: req.params.id
        },
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
        const blogpost = Data.get({plain: true});
        Comments.findAll({
            where: {
                blogpost_id: id
            },
            attributes: [
                'id',
                'user',
                'text',
                'created_at'
            ],
            include: [
                // will have to include commenter username
            ]
        })
        .then(Data => {
            const postcomments = Data.map(commentdata => commentdata.get({plain: true}))
            res.render('post', {
                blogpost,
                postcomments,
            }, 
            );
        })
        
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

router.get('/signup', async (req,res) => {
    res.render('signup');
})

router.get('/addpost', async (req,res) => {
    res.render('addpost');
})

router.get('/post', async (req,res) => {
    res.render('post')
})

module.exports = router;
