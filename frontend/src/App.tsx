/* eslint-disable require-jsdoc */
import './App.css';
// import {useState} from 'react';
// import {web3} from '@project-serum/anchor';

import {getPhantomWallet} from '@solana/wallet-adapter-wallets';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import AdminPanelPage from './pages/admin-panel';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import {UserContextProvider} from './context/user-context';
import UserHomePage from './pages/user-home';

const wallets = [getPhantomWallet()];

function App() {
  const wallet = useWallet();

  if (!wallet.connected) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '100px'}}>
        <WalletMultiButton />
      </div>
    );
  } else {
    return (
      <div className="App">
        Wallet is initialized.
      </div>
    );
  }
}

const AppWithProvider = () => (
  <ThemeProvider theme={theme}>
    <ConnectionProvider
      endpoint={process.env.REACT_APP_BLOCKCHAIN_URL as string}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <UserContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<UserHomePage />} />
                <Route path="/admin" element={<AdminPanelPage />} />
              </Routes>
            </BrowserRouter>
          </UserContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  </ThemeProvider>
);

export default AppWithProvider;
