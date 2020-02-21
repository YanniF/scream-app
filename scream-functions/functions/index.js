const functions = require('firebase-functions');
const fbAuth = require('./util/fbAuth');
const app = require('express')();

const { getAllScreams, postScream } = require('./handlers/screams');
const { signup, login, uploadImage } = require('./handlers/users');

// Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', fbAuth, postScream);

// Users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', fbAuth, uploadImage);

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);
