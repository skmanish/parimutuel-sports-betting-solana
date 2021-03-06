import {NETWORK_CONFIG} from './config';

/* eslint-disable require-jsdoc */
const eventsDb = NETWORK_CONFIG.EVENTS_DB;

class EventApis {
    db: any;
    constructor(firestoreDatabase) {
      this.db = firestoreDatabase;
    }

    // GET /api/events
    // Expected input {publicKeyInBase58: x, eventId: string}
    async getEvents(req, res) {
      const snapshot = await this.db.collection(eventsDb).get();
      let events = snapshot.docs.map((doc, index) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      // Remove empty doc (if any).
      // Atleast one doc is required for a collection.
      events = events.filter((x)=>'eventAuthorityPublicKeyBase58' in x);
      // TODO: Also remove docs which are not created by admin account.
      res.json(events);
    }

    async updateEvent(req, res) {
      await this.db.collection(eventsDb).doc(
          req.body.eventAccountPublicKeyBase58).set(req.body);
      res.json({message: 'success'});
    }

    async createEvent(req, res) {
      if (!req.body.eventAccountPublicKeyBase58) {
        res.status(500).send('event account\'s public key is undefined');
      } else {
        await this.db.collection(eventsDb).doc(
            req.body.eventAccountPublicKeyBase58).set(req.body);
        res.json({message: 'success'});
      }
    }
}
export default EventApis;
