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

const wallets = [getPhantomWallet()];

// const programID = new PublicKey(idl.metadata.address);

function App() {
  // const [value, setValue] = useState('');
  // const [dataList, setDataList] = useState([]);
  // const [input, setInput] = useState('');
  const wallet = useWallet();


  // async function initialize() {
  //   const provider = await getProvider();
  //   /* create the program interface combining the idl,
  //      program ID, and provider
  //   */
  //   const program = new Program(idl, programID, provider);
  //   console.log('ProgramID', programID);
  //   try {
  //     /* interact with the program via rpc */
  //     await program.rpc.initialize('Hello World', {
  //       accounts: {
  //         baseAccount: baseAccount.publicKey,
  //         user: provider.wallet.publicKey,
  //         systemProgram: SystemProgram.programId,
  //       },
  //       signers: [baseAccount],
  //     });

  //     const account = await program.account.baseAccount.fetch(
  //         baseAccount.publicKey);
  //     console.log('account: ', account);
  //     setValue(account.data.toString());
  //     setDataList(account.dataList);
  //   } catch (err) {
  //     console.log('Transaction error: ', err);
  //   }
  // }

  // async function update() {
  //   if (!input) return;
  //   const provider = await getProvider();
  //   const program = new Program(idl, programID, provider);
  //   await program.rpc.update(input, {
  //     accounts: {
  //       baseAccount: baseAccount.publicKey,
  //     },
  //   });
  //
  //   const account = await program.account.baseAccount.fetch(
  //       baseAccount.publicKey);
  //   console.log('account: ', account);
  //   setValue(account.data.toString());
  //   setDataList(account.dataList);
  //   setInput('');
  // }

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
  <ConnectionProvider endpoint="http://127.0.0.1:8899">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="admin" element={<AdminPanelPage />} />
          </Routes>
        </BrowserRouter>
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);

export default AppWithProvider;
