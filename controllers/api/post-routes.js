const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');
const { Log } = require('../../utils/Utilities');

//router.get('./public/css/style.css', (req, res) => res.sendFile(path.join(__dirname, '/public/css/style.css')))
//router.get('./public/js/login.js', (req, res) => res.sendFile(path.join(__dirname, '/public/js/login.js')))
//router.get('./public/js/signup.js', (req, res) => res.sendFile(path.join(__dirname, '/public/js/signup.js')))

router.post('/', withAuth, async (req, res) => {
    try { 
        const newPost = await Post.create({ ...req.body, userId: req.session.userId });
        //console.log("newPost",  newPost);
        res.status(200).json(newPost);
    } catch (err) {
        console.log('err', err);
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const { postTitle, postContent } = req.body;

        postContent = postContent.toString().replaceAll('\n', '<br>');
        const affectedRows = await Post.update({title: postTitle, content: postContent}, { where: { id: req.params.id }});
        //Log('\n\naffectedRows\n\n', affectedRows);
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch (err) {
        Log('err', err);
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const affectedRows = Post.destroy({ where: { id: req.params.id } });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch (err) {
        Log('err', err);
        res.status(400).json(err);
    }
});

module.exports = router;
