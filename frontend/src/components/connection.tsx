/* eslint-disable require-jsdoc */
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import {Stack, Tooltip, Typography} from '@mui/material';
import {useContext} from 'react';
import {UserContext} from '../context/user-context';

const WalletConnection = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      {userContext.userPublicKeyBase58 &&
      <Stack direction='row' spacing={1}>
        <Typography>
          {userContext.userPublicKeyBase58.substring(0, 5) +
                '...' + userContext.userPublicKeyBase58.substring(
              userContext.userPublicKeyBase58.length-5,
              userContext.userPublicKeyBase58.length)}
        </Typography>
        <Tooltip title="Connected">
          <PublicIcon />
        </Tooltip>
      </Stack>
      }
      {!userContext.userPublicKeyBase58 &&
      <Tooltip title='Not connected'>
        <PublicOffIcon />
      </Tooltip>
      }
    </>
  );
};
export {WalletConnection};
