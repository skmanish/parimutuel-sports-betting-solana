/* eslint-disable require-jsdoc */
import {EventMetadata, EventState} from '../types/event';
import {User} from '../types/user';
import {ApiResponse} from '../types/api-response';
import {sendLamports} from '../utils/anchor-utils';
import {Wallet} from '@project-serum/anchor';
import {LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import axios from 'axios';

class userApi {
    // Assumes that event is updated already.
    static canIBetInAnEvent = (
        event: EventMetadata,
        user: User,
    ): ApiResponse => {
      if (event.eventState != EventState.STARTED) {
        return {error: 'Event is not in started state'};
      } else if (user.userEvents && event.eventAccountPublicKeyBase58 &&
        user.userEvents.indexOf(event.eventAccountPublicKeyBase58) > -1) {
        return {error: 'Already participated'};
      }
      return {success: true};
    }

    static placeBet = async (
        event: EventMetadata,
        wallet: Wallet,
        lamports: number,
        userChoice: number) => {
      const txSignature = await sendLamports(
          wallet,
          new PublicKey(event.eventVaultPubkey),
          lamports);
      if (txSignature == '') {
        return {
          error: 'Sending lamports failed. Signature is empty'} as ApiResponse;
      } else {
        await axios.post(
            '/api/user/placebet',
            {
              publicKeyInBase58: wallet.publicKey.toBase58(),
              transactionSignature: txSignature,
              eventId: event.eventAccountPublicKeyBase58,
              userChoice: userChoice,
              userSolCents: (lamports*100)/LAMPORTS_PER_SOL,
            },
        ).then((response) => {
          return {success: true} as ApiResponse;
        }).catch((error) => {
          return {error: error} as ApiResponse;
        });
      }
    }
}
export {userApi};
