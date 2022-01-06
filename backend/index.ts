import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config({path: `.env.${process.env.NODE_ENV}`});
import path from 'path';
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
import EventApis from './events';
import {NETWORK_CONFIG} from './config';

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

/* Event APIs */
const eventApis = new EventApis(db);
app.get('/api/events', eventApis.getEvents.bind(eventApis));
app.post('/api/events/update', eventApis.updateEvent.bind(eventApis));
app.post('/api/events/create', eventApis.createEvent.bind(eventApis));

/* User APIs */
const userApis = new UserApis(db);
app.post('/api/user/events', userApis.getMyEvents.bind(userApis));
app.get('/api/user/event', userApis.myBetInThisEvent.bind(userApis));
app.post('/api/user/placebet', userApis.placeBet.bind(userApis));
app.post('/api/user/redeembet', userApis.redeemBet.bind(userApis));

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

console.log('BLOCKCHAIN_URL', NETWORK_CONFIG.BLOCKCHAIN_URL);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
