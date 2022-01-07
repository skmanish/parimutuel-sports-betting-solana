const LOCAL_BLOCKCHAIN_URL='http://localhost:8899';
const DEVENET_BLOCKCHAIN_URL='https://api.devnet.solana.com';
const MAINNET_BLOCKCHAIN_URL='https://api.mainnet-beta.solana.com';

// Ensure this value is correctly set before running a yarn build!
const BLOCKCHAIN_URL=DEVENET_BLOCKCHAIN_URL;

export {
  BLOCKCHAIN_URL,
  LOCAL_BLOCKCHAIN_URL,
  DEVENET_BLOCKCHAIN_URL,
  MAINNET_BLOCKCHAIN_URL,
};
