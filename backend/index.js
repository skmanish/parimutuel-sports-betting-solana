const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const {
  initializeApp,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
} = require('firebase-admin/firestore');

const serviceAccount = require('../strut-336918-eeb8eca850d9.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const eventsDb = db.collection('events');

app.post('/api/events/create', async (req, res) => {
  await eventsDb.doc(req.body.eventAccountPublicKeyBase58).set(req.body);
  res.json({message: 'success'});
});

app.post('/api/events/update', async (req, res) => {
  await eventsDb.doc(req.body.eventAccountPublicKeyBase58).set(req.body);
  res.json({message: 'success'});
});

app.get('/api/events', async (req, res) => {
  const snapshot = await eventsDb.get();
  const events = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  res.json(events);
});

app.get('/api', (req, res) => {
  res.json({message: 'Hello from server!'});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
