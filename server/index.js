require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
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

app.listen(SERVER_PORT, () => console.log(`Chatting on ${SERVER_PORT}`));