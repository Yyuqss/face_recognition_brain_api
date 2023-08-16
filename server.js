const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const image = require('./controllers/image.js');
const profile_email = require('./controllers/profile_email.js');
const profile_id = require('./controllers/profile_id.js');
const { handleRegister } = require('./controllers/register.js');
const { handleImage } = require('./controllers/image.js');
const { handleProfile_email } = require('./controllers/profile_email.js');
const { handleProfile_id } = require('./controllers/profile_id.js');
const { handleApiCall } = require('./controllers/apiCall.js');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
});

const app = express();
const port = process.env.port;

app.use(express.json());
app.use(cors());

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

app.get('/profile_id/:id', (req, res) => handleProfile_id(req, res, db, bcrypt));

app.get('/profile_email/:email', (req, res) => handleProfile_email(req, res, db, bcrypt));

app.put('/image', (req, res) => handleImage(req, res, db, bcrypt));

app.post('/apicall', (req, res) => handleApiCall(req, res));

app.get('/', (req, res) => {
    db.select('*').from('users')
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Could't find users"));
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})