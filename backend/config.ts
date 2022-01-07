const MAINNET_NETWORK_CONFIG = {
  BLOCKCHAIN_URL: 'https://api.mainnet-beta.solana.com',
  USERS_DB: 'users-main',
  EVENTS_DB: 'events-main',
  WALLETS_DB: 'wallets-main',
};
const DEVENET_NETWORK_CONFIG = {
  BLOCKCHAIN_URL: 'https://api.devnet.solana.com',
  USERS_DB: 'users-dev',
  EVENTS_DB: 'events-dev',
  WALLETS_DB: 'wallets-dev',
};
const LOCALNET_NETWORK_CONFIG = {
  BLOCKCHAIN_URL: 'http://127.0.0.1:8899',
  USERS_DB: 'users',
  EVENTS_DB: 'events',
  WALLETS_DB: 'wallets',
};

// Ensure this value is correctly set before running a gcloud deploy!
const NETWORK_CONFIG = DEVENET_NETWORK_CONFIG;

export {
  NETWORK_CONFIG,
  LOCALNET_NETWORK_CONFIG,
  DEVENET_NETWORK_CONFIG,
  MAINNET_NETWORK_CONFIG,
};
