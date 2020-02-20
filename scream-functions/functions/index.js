const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require("./keys/admin.json")),
});

const express = require("express");
const app = express();

app.get("/screams", (req, res) => {
  admin
    .firestore()
    .collection("screams")
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let screams = [];

      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createAt,
        });
      });

      return res.json(screams);
    })
    .catch(error => console.error(error));
});

app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection("screams")
    .add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(error => {
      res.status(500).json({ error: "Something went wrong" });
      console.error(error);
    });
});

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);
