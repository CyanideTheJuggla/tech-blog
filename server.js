const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/Utilities');

const sequelize = require('./config/connection');
const { Log } = require('./utils/Utilities');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT;

const hbs = exphbs.create({ helpers });

console.log('process.env.SESS_EXP_MIN', process.env.SESS_EXP_MIN)

const sess = {
  secret: 'Tech-blog secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(function(req, res, next){
    try {
        console.log('\n');
        console.log('res.req.session', res.req.session);
        console.log('\n');
        res.locals["loggedIn"] = res.req.session.loggedIn;
        //req.req.session.cookie._expires = new Date().getTime() + (process.env.SESS_EXP_MIN * 60000);
        
    } catch (error) {
        console.log('error', error);
    } finally {
        next();
    }
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});