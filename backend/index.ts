import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config({path: `.env.${process.env.NODE_ENV}`});

import {
  initializeApp,
  cert,
  ServiceAccount,
} from 'firebase-admin/app';
import {
  getFirestore,
} from 'firebase-admin/firestore';
import serviceAccount from '../strut-336918-eeb8eca850d9.json';
import UserApis from './user';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const db = getFirestore();
const eventsDb = db.collection(process.env.EVENTS_DB);

app.post('/api/events/create', async (req, res) => {
  if (!req.body.eventAccountPublicKeyBase58) {
    res.status(500).send('event account\'s public key is undefined');
  } else {
    await eventsDb.doc(req.body.eventAccountPublicKeyBase58).set(req.body);
    res.json({message: 'success'});
  }
});

app.post('/api/events/update', async (req, res) => {
  await eventsDb.doc(req.body.eventAccountPublicKeyBase58).set(req.body);
  res.json({message: 'success'});
});

app.get('/api/events', async (req, res) => {
  const snapshot = await eventsDb.get();
  let events = snapshot.docs.map((doc, index) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  // Remove empty doc (if any).
  // Atleast one doc is required for a collection.
  events = events.filter((x)=>'eventAuthorityPublicKeyBase58' in x);

  res.json(events);
});

/* User APIs */
const userApis = new UserApis(db);
app.post('/api/user/events', userApis.getMyEvents.bind(userApis));
app.get('/api/user/event', userApis.myBetInThisEvent.bind(userApis));
app.post('/api/user/placebet', userApis.placeBet.bind(userApis));
app.post('/api/user/redeembet', userApis.redeemBet.bind(userApis));

console.log('BLOCKCHAIN_URL', process.env.BLOCKCHAIN_URL);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
