/* eslint-disable require-jsdoc */
import {EventMetadata, EventState} from '../types/event';
import {User, UserEvent} from '../types/user';
import {ApiResponse} from '../types/api-response';
import {sendLamports} from '../utils/anchor-utils';
import {Wallet} from '@project-serum/anchor';
import {LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import axios from 'axios';

class userApi {
    // Assumes that event is updated already.
    static canIBetInAnEvent = (
        event: EventMetadata,
        userEvents: UserEvent[],
    ): ApiResponse => {
      if (event.eventState != EventState.STARTED) {
        return {error: 'Event is not in started state'};
      } else if (userEvents && event.eventAccountPublicKeyBase58) {
        const participatedEventIds = userEvents.map((x)=>x.eventId);
        if (participatedEventIds.indexOf(
            event.eventAccountPublicKeyBase58) > -1) {
          return {error: 'Already participated'};
        }
      }
      return {success: true};
    }

    static myBetInAnEvent(
        event: EventMetadata,
        userEvents: UserEvent[]): [number, number, number] {
      for (let i = 0; i < userEvents.length; i++) {
        if (userEvents[i].eventId == event.eventAccountPublicKeyBase58) {
          return [
            userEvents[i].userChoice as number,
            userEvents[i].userSolCents as number,
            ('winningsSolCents' in userEvents[i]) ?
            userEvents[i].winningsSolCents as number : -1,
          ];
        }
      }
      return [-1, -1, -1];
    };

    static getMyEvents = async (user: User) => {
      if (!user.userPublicKeyBase58) return [] as UserEvent[];
      const response = await axios.post(
          '/api/user/events',
          {publicKeyInBase58: user.userPublicKeyBase58},
      );
      return response.data.events as UserEvent[];
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
      if (txSignature == -1) {
        return {error: 'Insufficient funds in wallet!'} as ApiResponse;
      } else if (txSignature == '') {
        return {
          error: 'Sending lamports failed. Signature is empty'} as ApiResponse;
      } else {
        return await axios.post(
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
    static redeemBet = async (
        userPublicKeyBase58: string,
        eventId: string,
        vaultPublicKeyBase58: string,
        successCallback: any,
    ) => {
      await axios.post(
          '/api/user/redeembet',
          {
            publicKeyInBase58: userPublicKeyBase58,
            eventId: eventId,
            vaultPublicKeyBase58: vaultPublicKeyBase58,
          },
      ).then((response) => {
        successCallback(response);
      }).catch((error) => {
        console.log(error);
      });
    }
}
export {userApi};
