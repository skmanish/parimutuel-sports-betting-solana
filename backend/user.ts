/* eslint-disable require-jsdoc */
import {
  fetchEvent,
  getTotalWinningsForUserInSol,
  registerUserBetOnEventAccount,
} from './solana/program';
import {
  getAdminCreateUpdateKeyPairFromDb,
  getVaultKeyPairFromDb,
  transferSolToAccount,
} from './solana/solana';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Keypair,
} from '@solana/web3.js';

const usersDb = process.env.USERS_DB;

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
        usersDb).doc(req.body.publicKeyInBase58).get();
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
        usersDb).doc(req.body.publicKeyInBase58).get();
    if (participatedEvents.exists) {
      const mEvent = participatedEvents.data().events.filter(
          (x)=>x.eventId == req.body.eventId);
      if (mEvent.length > 0) res.status(200).send(mEvent[0]);
      else res.status(500).send({});
      return;
    };
    res.status(500).send({});
  }

  /* POST /api/user/placebet
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
        usersDb).doc(req.body.publicKeyInBase58).get();
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
    await this.db.collection(usersDb).doc(req.body.publicKeyInBase58).set(
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

  /* POST /api/user/redeembet
      Expected input {
        publicKeyInBase58: string,
        eventId: string,
        vaultPublicKeyBase58: string,
      }
  */
  async redeemBet(req, res) {
    // Step 1: Check if participated/redeemed already, or event resolved.
    const participatedEvents = await this.db.collection(
        usersDb).doc(req.body.publicKeyInBase58).get();
    if (!participatedEvents.exists) {
      res.status(500).send('You have not participated in this event');
      return;
    }
    const eventIds = participatedEvents.data().events.map((x)=>x.eventId);
    if (!eventIds.includes(req.body.eventId)) {
      res.status(500).send('You have not participated in this event');
      return;
    }
    const userEvent = participatedEvents.data().events[
        eventIds.indexOf(req.body.eventId)];
    if (userEvent.winningsSignature || userEvent.winningsSolCents) {
      res.status(500).send('You have already redeemed');
      return;
    }
    const eventAccount: any = await fetchEvent(req.body.eventId, this.db);
    if (
      eventAccount.state != 3 ||
      eventAccount.correctOptionNumber > 4 ||
      eventAccount.correctOptionNumber < 0
    ) {
      res.status(500).send('Event has not been properly resolved');
    }
    // Step 2: Transfer money from vault account to user.
    const userWinningsInSol = getTotalWinningsForUserInSol(
        eventAccount,
        userEvent.userChoice,
        userEvent.userSolCents,
    );
    const keypair = await getVaultKeyPairFromDb(
        this.db, req.body.vaultPublicKeyBase58);
    if (!keypair) {
      res.status(500).send('Vault keypair is not found');
      return;
    }
    const txSignature = await transferSolToAccount(
        keypair as Keypair,
        new PublicKey(req.body.publicKeyInBase58),
        userWinningsInSol*LAMPORTS_PER_SOL,
    );
    // Step 3: Store in the DB that SOL has been redeemed.
    const allParticipatedEvents = participatedEvents.data().events;
    allParticipatedEvents[eventIds.indexOf(req.body.eventId)] = {
      ...userEvent,
      winningsSolCents: userWinningsInSol*100,
      winningsSignature: txSignature,
    };
    await this.db.collection(usersDb).doc(req.body.publicKeyInBase58).set(
        {'events': allParticipatedEvents});
    res.status(200).send(userWinningsInSol+'');
    return;
  }
};
export default UserApis;

