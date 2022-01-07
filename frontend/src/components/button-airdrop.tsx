/* eslint-disable require-jsdoc */
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {requestAirdrop} from '../utils/anchor-utils';
import {useWallet} from '@solana/wallet-adapter-react';
import {ToastContext} from '../context/toast-context';
import {useContext} from 'react';

export default function AirdropButton() {
  const wallet = useWallet();
  const {successMessage, failureMessage} = useContext(ToastContext);

  const buttonAction = async () => {
    // @ts-ignore
    const apiResponse = await requestAirdrop(wallet);
    if (apiResponse.error) failureMessage(apiResponse.error);
    else successMessage('Successfully airdropped 5 SOL into your account');
  };

  return (
    <Tooltip title="Request Airdrop">
      <IconButton sx={{mr: 1}} onClick={buttonAction}>
        <LocalGasStationIcon fontSize='large'/>
      </IconButton>
    </Tooltip>
  );
};
