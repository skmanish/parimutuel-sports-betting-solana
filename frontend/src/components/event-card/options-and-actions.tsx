/* eslint-disable require-jsdoc */
import {EventMetadata} from '../../types/event';
import {
  getValidOptions,
  getValidOptionsPercentageStakes,
} from '../../utils/event-utils';
import {
  Typography,
  Divider,
  Stack,
  Button,
  Box,
} from '@mui/material';
import LinearProgressWithLabel from './progress-with-label';
import {userApi} from '../../api/userApi';
import {useWallet} from '@solana/wallet-adapter-react';
import {eventsApi} from '../../api/eventsApi';
import {useContext, useState} from 'react';
import {UserEvent} from '../../types/user';
import {UserContext} from '../../context/user-context';
import {ToastContext} from '../../context/toast-context';

export default function EventCardOptionsAndActions(
    props: {event: EventMetadata, userEvents: UserEvent[]},
) {
  const wallet = useWallet();
  // TODO: Keep either userContext or userEvents.
  const userContext = useContext(UserContext);
  const {successMessage, failureMessage} = useContext(ToastContext);

  const [event, setEvent] = useState<EventMetadata>(props.event);
  const validOptionsText: string[] = getValidOptions(event);
  const validOptionsPercentageStakes: number[
  ] = getValidOptionsPercentageStakes(event);
  const bettable = userApi.canIBetInAnEvent(event, props.userEvents);
  const [
    chosenOption,
    chosenSolCents,
    winningsSolCents] = userApi.myBetInAnEvent(event, props.userEvents);
  const [redeeming, setRedeeming] = useState(false);

  const getButtonTextBasedOnIndex = (index: number) => {
    if (chosenSolCents == -1) return 'Bet 0.5 SOL';
    if (chosenOption == index) return 'Staked 0.5 SOL';
    return 'No stakes';
  };

  const placeBet = async (chosenOption: number) => {
    if (!wallet.publicKey) {
      failureMessage('Please connect to wallet');
      return;
    }
    // @ts-ignore
    const apiResponse = await userApi.placeBet(event, wallet,
        5e8, chosenOption);
    if (apiResponse && apiResponse.success) {
      successMessage('Successfully placed bet');
      // @ts-ignore
      const updatedEvent = await eventsApi.updateEvent(event, wallet);
      if (updatedEvent) setEvent(updatedEvent);
      userContext.updateUserEvents();
    }
  };

  const redeemWinnings = async () => {
    setRedeeming(true);
    await userApi.redeemBet(
        userContext.userPublicKeyBase58,
        event.eventAccountPublicKeyBase58 as string,
        event.eventVaultPubkey as string, (response: any) => {
          successMessage('Total winnings: ' + response.data as string);
        });
    userContext.updateUserEvents();
    setRedeeming(false);
  };
  return (
    <Stack spacing={1} sx={{width: '100%', p: 1}}>
      <Divider light style={{width: '100%'}}/>
      {validOptionsText.map((option, index)=>(
        <div key={index}>
          <Stack
            spacing={1}
            direction='row'
            sx={{display: 'flex', width: '100%'}}>
            <Box
              display='flex'
              sx={{flexGrow: 1}}>
              <Typography
                variant='body2'
                m='auto'
                color='text.secondary'>
                {option}
              </Typography>
            </Box>
            <LinearProgressWithLabel
              value={validOptionsPercentageStakes[index]} />
            <Button
              variant="outlined"
              size='small'
              color="error"
              onClick={() => {
                placeBet(index);
              }}
              disabled={'error' in bettable}
              sx={{fontSize: '10px', width: '50%'}}>
              {getButtonTextBasedOnIndex(index)}
            </Button>
          </Stack>
          <Divider light style={{width: '100%'}}/>
        </div>
      ))}
      {
        (event.eventState == 3) &&
      (chosenOption > -1) &&
      (winningsSolCents == -1) && (
          <Button
            variant="contained"
            onClick={redeemWinnings}
            disabled={redeeming}>
          Redeem
          </Button>
        )}
    </Stack>
  );
};

