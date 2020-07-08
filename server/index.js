require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
      groupCtrl = require('./controllers/groupController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      app = express();

app.use(express.json());
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
});

//Auth Endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);

//Group Endpoints
app.get('/api/groups/:id', groupCtrl.getUserGroups);
app.post('/api/group', groupCtrl.createGroup);

app.listen(SERVER_PORT, () => console.log(`Chatting on ${SERVER_PORT}`));