import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
  initializeApp,
  cert,
  ServiceAccount,
} from 'firebase-admin/app';
import {
  getFirestore,
} from 'firebase-admin/firestore';
import serviceAccount from '../strut-336918-eeb8eca850d9.json';
import UserApis from './user/user';

dotenv.config();
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
  const events = snapshot.docs.map((doc, index) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  res.json(events);
});

/* User APIs */
const userApis = new UserApis(db);
// Returns a list of events that user has participated/bet in.
app.get('/api/user/events', userApis.myevents.bind(userApis));
app.get('/api/user/event', userApis.myBetInThisEvent.bind(userApis));
app.post('/api/user/placebet', userApis.placeBet.bind(userApis));
// app.get('/api/user/redeembet', userApis.redeemBet);

app.get('/api', (req, res) => {
  res.json({message: 'Hello from server!'});
});
console.log(process.env.BLOCKCHAIN_URL);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
