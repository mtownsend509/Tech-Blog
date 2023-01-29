const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./Controllers');
const path = require('path');
const sequelize = require('./config/Connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const helpers = require('./Utils/')

const app = express();
const PORT = process.env.PORT || 3001;

// const hbs = exphbs.create({ helpers });
const hbs = exphbs.create();

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge:900000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set ('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {console.log(`now listening at port ${PORT}`)})
})