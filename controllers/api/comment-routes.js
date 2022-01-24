const router = require('express').Router();
const { User, Comment } = require('../../models/');
const withAuth = require('../../utils/auth');
const Utilities = require('../../utils/Utilities');

router.get('/', withAuth, async (req, res) => {
    try{ 
        const commentData = await Comment.findAll({ include: [User], order: [['created_at', 'ASC']] });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        //Utilities.Log('comments:', comments)
        res.status(200).render('comment', {comments, loggedIn: req.session.loggedIn});
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    const { postId, comment } = req.body;
    try {
        const newComment = await Comment.create({ postId: postId, comment: comment, userId: req.session.userId });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
