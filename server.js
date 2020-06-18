const express = require('express');
const bcrypt =  require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

console.log(process.env.DATABASE_URL);

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working') })
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
// id = id: id <-es6 feature
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

//async
// bcrypt.hash("bacon", null, null, function (err, hash) {
  // Store hash in your password DB.
//});

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
//   // res = false
// });

const PORT = process.env.PORT
app.listen(PORT || 3000, () => {
  console.log(`app is running on port : ${PORT} `)
})
console.log(PORT)
/*
/signin --> POST = success/fail
/register --> POST = user (new user)
/profile/:userId --> GET = user
/image --> PUT --> user (updated)

*/