const router = require('express').Router();
const { User } = require('../../models');
const { Log } = require('../../utils/Utilities');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try 
    {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        //console.log('user.password', user.password)
        //console.log('req.body.password', req.body.password)

        if (!user) {
            res.status(400).send({ message: 'User does not exist' });
            return;
        }

        const validPassword = user.checkPassword(req.body.password);
        console.log('validPassword', validPassword)

        if (!validPassword) {
            res.status(400).send({message: "Incorrect Username/Password"});
            return;
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
            res.status(200).send({ message: 'Login success' });
        });
    } catch (err) {
        res.status(400).send({ message: 'User does not exist' });
    }
});

router.post('/logout', (req, res) => {
    try {
        req.session.destroy(() => {
            res.status(200).send( {message: 'Logged out'} );
        });
    } catch (err) {
        console.log('err', err);
        res.status(400).send({ error: err, message: 'Something went wrong.'} )    
    }
});

router.get('/check', (req, res) => res.status(200).send({loggedIn: req.session.loggedIn}));

module.exports = router;
