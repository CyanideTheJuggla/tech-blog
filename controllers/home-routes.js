const router = require('express').Router();
const session = require('express-session');
const path = require('path');
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');
const Utilities = require('../utils/Utilities');

router.get('/public/css/style.css', (req, res) => res.sendFile(path.join(__dirname, '../public/css/style.css')))
router.get('/public/js/login.js', (req, res) => res.sendFile(path.join(__dirname, '../public/js/login.js')))
router.get('/public/js/logout.js', (req, res) => res.sendFile(path.join(__dirname, '../public/js/logout.js')))
router.get('/public/js/signup.js', (req, res) => res.sendFile(path.join(__dirname, '../public/js/signup.js')))
router.get('/public/js/post.js', (req, res) => res.sendFile(path.join(__dirname, '../public/js/post.js')))
router.get('/public/js/comment.js', (req, res) => res.sendFile(path.join(__dirname, '../public/js/comment.js')))
router.get('/public/js/edit.js', (req, res) => res.sendFile(path.join(__dirname, '../public/js/edit.js')))

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User, { model: Comment, include: [User] }],
            order: [['post_date', 'DESC']]
        });
        //Utilities.Log('postData', postData)
        const posts = postData.map((post) => post.get({ plain: true }));
        posts.forEach(post => {
            post["currentUser"] = (post.user.id == req.session.userId);
        });
        res.status(200).render('all-posts', { posts: posts});
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {id: req.params.id},
            include: [User, { model: Comment, include: [User] }]
        });
        if (postData) {
            const post = postData.get({ plain: true });
            post["currentUser"] = (post.user.id == req.session.userId);
            res.status(200).render('selected-post', { post, selected: true});
        } else {
            res.status(400).end();
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.status(200).redirect('/dash');
        return;
    }
    res.status(200).render('login');
});

router.get('/logout', (req, res) => {
    res.status(200).redirect('/login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dash');
        return;
    }
    res.status(200).render('sign-up');
});

module.exports = router;