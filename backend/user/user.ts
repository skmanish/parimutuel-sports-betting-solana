import {registerUserBetOnEventAccount} from '../solana/program';
import {getAdminCreateUpdateKeyPairFromDb} from '../solana/solana';

/* eslint-disable require-jsdoc */
class UserApis {
  db: any;
  constructor(firestoreDatabase) {
    this.db = firestoreDatabase;
  }

  // POST /api/user/events.
  // Expected input {publicKeyInBase58: x}
  async getMyEvents(req, res) {
    if (!req.body.publicKeyInBase58) {
      res.status(500).send({'error': 'Empty param: `publicKeyInBase58`'});
      return;
    }
    const participatedEvents = await this.db.collection(
        'users').doc(req.body.publicKeyInBase58).get();
    if (!participatedEvents.exists) {
      res.status(200).send({events: []});
    } else {
      res.status(200).send(participatedEvents.data());
    }
  }

  // GET /api/user/event
  // Expected input {publicKeyInBase58: x, eventId: string}
  async myBetInThisEvent(req, res) {
    const participatedEvents = await this.db.collection(
        'users').doc(req.body.publicKeyInBase58).get();
    if (participatedEvents.exists) {
      const mEvent = participatedEvents.data().events.filter(
          (x)=>x.eventId == req.body.eventId);
      if (mEvent.length > 0) res.status(200).send(mEvent[0]);
      else res.status(500).send({});
      return;
    };
    res.status(500).send({});
  }

  /* GET /api/user/placebet
      Expected input {
        publicKeyInBase58: string,
        transactionSignature: string,
        eventId: string,
        userChoice: number,
        userSolCents: number,
      }
  */
  async placeBet(req, res) {
    /* participatedEvents will be like:
       {
         events: [
           {
             eventId: x,
             userChoice: y,
             transactionSignature: z,
             userSolCents: xx,
           },
           ...
         ]
       }
    */
    const participatedEvents = await this.db.collection(
        'users').doc(req.body.publicKeyInBase58).get();
    if (
      participatedEvents.exists &&
      participatedEvents.data().events.map((x)=>x.eventId).includes(
          req.body.eventId)
    ) {
      res.status(500).send({error: 'Already participated in this event'});
      return;
    }
    let updatedParticipatedEvents = [{
      'eventId': req.body.eventId,
      'transactionSignature': req.body.transactionSignature,
      'userChoice': req.body.userChoice,
      'userSolCents': req.body.userSolCents,
    }];
    if (participatedEvents.exists) {
      updatedParticipatedEvents = participatedEvents.data().events.concat(
          updatedParticipatedEvents);
    }
    await this.db.collection('users').doc(req.body.publicKeyInBase58).set(
        {'events': updatedParticipatedEvents});
    const truthValue = await registerUserBetOnEventAccount(
        await getAdminCreateUpdateKeyPairFromDb(this.db),
        req.body.eventId,
        req.body.userChoice,
        req.body.userSolCents,
    );
    if (truthValue) {
      res.send({success: true});
      return;
    }
    res.status(500).send({
      error: 'could not register user bet on the program.'});
  }
};
export default UserApis;

