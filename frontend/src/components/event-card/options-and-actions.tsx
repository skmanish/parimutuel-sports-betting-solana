/* eslint-disable require-jsdoc */
import {EventMetadata} from '../../types/event';
import {
  getValidOptions,
  getValidOptionsPercentageStakes,
} from '../../utils/event-utils';
import {
  Typography,
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// eslint-disable-next-line max-len
import SentimentDissatisfiedRounded from '@mui/icons-material/SentimentDissatisfiedRounded';

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
  const [placingBet, setPlacingBet] = useState(false);

  const getButtonTextBasedOnIndex = (index: number) => {
    if (chosenSolCents == -1) return 'Bet 0.5 SOL';
    if (chosenOption == index) {
      return (
        <>
          <CheckCircleIcon sx={{mr: 1}}/> 0.5 SOL
        </>
      );
    }
    return '0 SOL';
  };
  const getRedeemButtonText = () => {
    if (redeeming) return 'REDEEMING ..';
    else if (winningsSolCents == 0) return 'You won 0 SOL';
    else if (winningsSolCents > 0) {
      return 'You won '+winningsSolCents/100+' SOL';
    }
    return 'REDEEM';
  };

  const placeBet = async (chosenOption: number) => {
    if (!wallet.publicKey) {
      failureMessage('Please connect to wallet');
      return;
    }
    setPlacingBet(true);
    // @ts-ignore
    const apiResponse = await userApi.placeBet(event, wallet,
        5e8, chosenOption);
    setPlacingBet(false);
    if (apiResponse && apiResponse.success) {
      successMessage('Successfully placed bet');
      // @ts-ignore
      const updatedEvent = await eventsApi.updateEvent(event, wallet);
      if (updatedEvent) setEvent(updatedEvent);
      userContext.updateUserEvents();
    } else if (apiResponse.error) {
      failureMessage(apiResponse.error);
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
    <Box display='flex' sx={{width: '100%'}}>
      <Stack spacing={1}
        sx={{p: 1, color: '#002255'}}
        justifyContent='space-evenly'
      >
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
                  color='#002255aa'>
                  {option}
                </Typography>
              </Box>
            </Stack>
          </div>
        ))}
      </Stack>
      <Stack spacing={1}
        sx={{p: 1, color: '#002255', flexGrow: 1}}
      >
        {validOptionsText.map((option, index)=>(
          <div key={index} style={{flexGrow: 1}}>
            <Stack
              spacing={1}
              direction='row'
              sx={{flexGrow: 1}}>
              <LinearProgressWithLabel
                value={validOptionsPercentageStakes[index]} />
              {placingBet?
              <CircularProgress color='inherit'/>:
              <Button
                variant="outlined"
                size='small'
                color="inherit"
                onClick={() => {
                  placeBet(index);
                }}
                disabled={'error' in bettable}
                sx={{fontSize: '10px', width: '100px'}}>
                {getButtonTextBasedOnIndex(index)}
              </Button>
              }
            </Stack>
          </div>
        ))}
        {
          (event.eventState == 3) && (chosenOption > -1) &&
        ((winningsSolCents == -1) ?
          <Button
            variant="contained"
            color="secondary"
            onClick={redeemWinnings}
            disabled={redeeming || winningsSolCents!=-1}>
            {getRedeemButtonText()}
          </Button> :
          <Box sx={{
            fontWeight: 700,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '1rem',
            paddingTop: 1,
            textTransform: 'uppercase',
            color: '#334e77',
          }}>
            {winningsSolCents > 0?
            (<>
              <EmojiEmotionsIcon sx={{px: 2}} />
              {'You swooped '+Math.floor(winningsSolCents)/100+' SOL!'}
              <EmojiEmotionsIcon sx={{px: 2}}/>
            </>):
            (<>
              <SentimentDissatisfiedRounded sx={{px: 2}} />
              {'You won '+Math.floor(winningsSolCents)/100+' SOL!'}
              <SentimentDissatisfiedRounded sx={{px: 2}}/>
            </>)}
          </Box>
        )
        }
      </Stack>
    </Box>
  );
};

