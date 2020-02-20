const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const config = require('./keys/firebaseConfig');

admin.initializeApp({
	credential: admin.credential.cert(require('./keys/admin.json')),
});

const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

app.get('/screams', (req, res) => {
	db
		.collection('screams')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let screams = [];

			data.forEach((doc) => {
				screams.push({
					screamId: doc.id,
					body: doc.data().body,
					userHandle: doc.data().userHandle,
					createdAt: doc.data().createAt,
				});
			});

			return res.json(screams);
		})
		.catch((error) => console.error(error));
});

app.post('/scream', (req, res) => {
	const newScream = {
		body: req.body.body,
		userHandle: req.body.userHandle,
		createdAt: new Date().toISOString(),
	};

	db
		.collection('screams')
		.add(newScream)
		.then((doc) => {
			res.json({ message: `document ${doc.id} created successfully` });
		})
		.catch((error) => {
			res.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
});

// sign up route
let token, userId;

app.post('/signup', (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		handle: req.body.handle,
	};

	// handles must be unique
	db
		.doc(`/users/${newUser.handle}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return res.status(400).json({ handle: 'this handle is already taken' });
			}
			else {
				return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
			}
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((userToken) => {
			token = userToken;

			const userCredentials = {
				userId,
				handle: newUser.handle,
				email: newUser.email,
				createdAt: new Date().toISOString(),
			};

			db.doc(`/users/${newUser.handle}`).set(userCredentials);
		})
		.then(() => {
			return res.status(201).json({ token });
		})
		.catch((error) => {
			console.error(error);

			if (error.code === 'auth/email-already-in-use') {
				return res.status(400).json({ email: 'Email is already in use' });
			}
			else {
				return res.status(500).json({ error: error.code });
			}
		});
});

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);
