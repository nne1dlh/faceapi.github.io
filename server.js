const express = require('express');
const bp = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const postgres = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password:'darren01',
		database: 'smaatbrain'
	},
	//debug: true
});

// postgres.select('*').from('users').then(data => {
// 	console.log(data);
// });

const app = express();

app.use(bp.json());
app.use(cors());

app.get('/', (req,res) => {
	res.send(db.users);
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, postgres, bcrypt)} );
app.post('/register', (req, res) => {register.handleRegister(req, res, postgres, bcrypt)} );
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, postgres)} );
app.put('/image', (req, res) => {image.handleImage(req, res, postgres)} );
app.post('/imageurl', (req, res) => {image.handleAPICall(req,res)} );

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})


/*
/ --> res= this is working
/signin --> POST = success/fail
/register --> POST = return new user
/profile/:userId --> GET = user
/image --> PUT --> user


*/