const functions = require('firebase-functions');
const fbAuth = require('./util/fbAuth');
const app = require('express')();
const { db } = require('./util/admin');

const {
	getAllScreams,
	postScream,
	getScream,
	deleteScream,
	commentOnScream,
	likeScream,
	unlikeScream,
} = require('./handlers/screams');
const {
	signup,
	login,
	uploadImage,
	addUserDetails,
	getAuthenticatedUser,
	getUserDetails,
	markNotificationsRead,
} = require('./handlers/users');

// Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', fbAuth, postScream);
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', fbAuth, deleteScream);
app.get('/scream/:screamId/like', fbAuth, likeScream);
app.get('/scream/:screamId/unlike', fbAuth, unlikeScream);
app.post('/scream/:screamId/comment', fbAuth, commentOnScream);

// Users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', fbAuth, uploadImage);
app.post('/user', fbAuth, addUserDetails);
app.get('/user', fbAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', fbAuth, markNotificationsRead);

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);

exports.createNotificationOnLike = functions
	.region('europe-west1')
	.firestore.document('likes/{id}')
	.onCreate((snapshot) => {
		return db
			.doc(`/screams/${snapshot.data().screamId}`)
			.get()
			.then((doc) => {
				if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
					return db.doc(`/notifications/${snapshot.id}`).set({
						createdAt: new Date().toISOString(),
						recipient: doc.data().userHandle,
						sender: snapshot.data().userHandle,
						type: 'like',
						read: false,
						screamId: doc.id,
					});
				}
			})
			.catch((err) => {
				console.error(err);
			});
	});

exports.deleteNotificationOnUnlike = functions
	.region('europe-west1')
	.firestore.document('likes/{id}')
	.onDelete((snapshot) => {
		return db.doc(`/notifications/${snapshot.id}`).delete().catch((err) => {
			console.error(err);
			return;
		});
	});

exports.createNotificationOnComment = functions
	.region('europe-west1')
	.firestore.document('comments/{id}')
	.onCreate((snapshot) => {
		return db
			.doc(`/screams/${snapshot.data().screamId}`)
			.get()
			.then((doc) => {
				if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
					return db.doc(`/notifications/${snapshot.id}`).set({
						createdAt: new Date().toISOString(),
						recipient: doc.data().userHandle,
						sender: snapshot.data().userHandle,
						type: 'comment',
						read: false,
						screamId: doc.id,
					});
				}
			})
			.catch((err) => {
				console.error(err);
				return;
			});
	});

exports.onUserImageChange = functions
	.region('europe-west1')
	.firestore.document('/users/{userId}')
	.onUpdate((change) => {
		if (change.before.data().imageUrl !== change.after.data().imageUrl) {
			const batch = db.batch();

			return db.collection('screams').where('userHandle', '==', change.before.data().handle).get().then((data) => {
				data.forEach((doc) => {
					const scream = db.doc(`/screams/${doc.id}`);

					batch.update(scream, { userImage: change.after.data().imageUrl });
				});

				return batch.commit();
			});
		}
		else {
			return true;
		}
	});

exports.onScreamDelete = functions
	.region('europe-west1')
	.firestore.document('/screams/{screamId}')
	.onDelete((snapshot, context) => {
		const screamId = context.params.screamId;
		const batch = db.batch();

		return db
			.collection('comments')
			.where('screamId', '==', screamId)
			.get()
			.then((data) => {
				data.forEach((doc) => {
					batch.delete(db.doc(`/comments/${doc.id}`));
				});

				return db.collection('likes').where('screamId', '==', screamId).get();
			})
			.then((data) => {
				data.forEach((doc) => {
					batch.delete(db.doc(`/likes/${doc.id}`));
				});

				return db.collection('notifications').where('screamId', '==', screamId).get();
			})
			.then((data) => {
				data.forEach((doc) => {
					batch.delete(db.doc(`/notifications/${doc.id}`));
				});

				return batch.commit();
			})
			.catch((err) => console.error(err));
	});
