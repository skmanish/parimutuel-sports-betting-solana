/* eslint-disable require-jsdoc */
class UserApis {
  constructor() {
  }
  set db(firestoreDatabase) {
    this.db = firestoreDatabase;
  }
  get db() {
    return this.db;
  }
  // GET /api/user/events.
  // Expected input {publicKeyInBase58: x}
  async myevents(req, res) {
    const userPubkey = req.body.publicKeyInBase58;
    const participatedEventIds = await this.db.collection(
        'users').doc(userPubkey);
    const participatedEvents = await this.db.collection(
        'events').where('id', 'in', participatedEventIds.ids).get();
    res.send(participatedEvents);
  }
  // GET /api/user/createbet.
  // Expected input {
  //   publicKeyInBase58: x,
  //   transactionSignature: y,
  //   eventId: z,
  // }
  async createBet(req, res) {
    const userPubkey = req.body.publicKeyInBase58;
    const participatedEventIds = await this.db.collection(
        'users').doc(userPubkey);
    const participatedEvents = await this.db.collection(
        'events').where('id', 'in', participatedEventIds.ids).get();
    res.send(participatedEvents);
  }
};
export default UserApis;

