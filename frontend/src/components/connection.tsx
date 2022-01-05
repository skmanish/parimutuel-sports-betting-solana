/* eslint-disable require-jsdoc */
import {
  WalletDialogProvider,
  WalletMultiButton,
} from './wallet-adapter-material-ui';

const WalletConnection = () => {
  return (
    <>
      <WalletDialogProvider>
        <WalletMultiButton />
      </WalletDialogProvider>
    </>
  );
};
export {WalletConnection};
