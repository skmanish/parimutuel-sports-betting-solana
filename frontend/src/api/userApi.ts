/* eslint-disable require-jsdoc */
import {EventMetadata, EventState} from '../types/event';
import {User} from '../types/user';
import {ApiResponse} from '../types/api-response';

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
}
export {userApi};
