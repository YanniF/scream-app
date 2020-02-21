const functions = require('firebase-functions');

const app = require('express')();
const fbAuth = require('./util/fbAuth')

const { getAllScreams, postScream } = require('./handlers/screams')
const { signup, login } = require('./handlers/users')

// Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', fbAuth, postScream);

// Users routes
app.post('/signup', signup)
app.post('/login', login)

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);
