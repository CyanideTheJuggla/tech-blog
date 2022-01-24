const router = require('express').Router();
const { path } = require('express/lib/application');
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');
const { Log } = require('../utils/Utilities');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where:{"userId": req.session.userId},
            include: [User, { model: Comment, include: [User] }],
            order: [['post_date', 'DESC']]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        posts.forEach(post => {
            post["currentUser"] = (post.user.id == req.session.userId);
        });
        res.status(200).render('all-posts', {
            layout: 'dash',
            posts
        });
    } catch (err) {
        Log('error', err);
        //res.redirect('login');
    }
});

router.get('/new', withAuth, (req, res) => {
    res.status(200).render('new-post', {
        layout: 'dash', loggedIn: req.session.loggedIn
    });
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (postData) {
            const post = postData.get({ plain: true });
            res.status(200).render('edit-post', {
                layout: 'dash',
                post, loggedIn: req.session.loggedIn
            });
        } else {
            res.status(400).end();
        }
    } catch (err) {
        Log('err', err);
        res.status(400).json(err);
    }
});

module.exports = router;
