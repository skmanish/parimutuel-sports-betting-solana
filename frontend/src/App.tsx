/* eslint-disable require-jsdoc */
import './App.css';

import {getPhantomWallet} from '@solana/wallet-adapter-wallets';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import AdminPanelPage from './pages/admin-panel';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import {UserContextProvider} from './context/user-context';
import UserHomePage from './pages/user-home';

const wallets = [getPhantomWallet()];

const AppWithProvider = () => (
  <ThemeProvider theme={theme}>
    <ConnectionProvider
      endpoint={process.env.REACT_APP_BLOCKCHAIN_URL as string}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <UserContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<UserHomePage />} />
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
