import {useWallet} from '@solana/wallet-adapter-react';
import {useState, createContext} from 'react';
import {defaultUser, User} from '../types/user';

export const UserContext = createContext({
  ...defaultUser,
  updateUserEvents: (user: User) => null,
});

interface Props {
  children?: any
  updateUserEvents: (user: User) => any
}

// userEvents value passed down by this provider are only updated
// when the wallet is changed.
export const UserContextProvider = (props: Props) => {
  const wallet = useWallet();
  const [user, setUser] = useState<User>(defaultUser);

  const getProviderValue = async () => {
    if (
      // Either of the public keys must be defined
      !(!user.userPublicKeyBase58 && !wallet.publicKey?.toBase58()) &&
      (user.userPublicKeyBase58 != wallet.publicKey?.toBase58())) {
      const newUser = {
        userPublicKeyBase58: wallet.publicKey?.toBase58() as string,
        userEvents: user.userEvents,
      };
      setUser({
        ...newUser,
        userEvents: await props.updateUserEvents(newUser),
      });
    }
    return {
      ...user,
      updateUserEvents: props.updateUserEvents,
    };
  };
  const getProviderValueSync = () => {
    getProviderValue();
    return {
      ...user,
      updateUserEvents: props.updateUserEvents,
    };
  };
  return (
    <UserContext.Provider value={getProviderValueSync()}>
      {props.children}
    </UserContext.Provider>
  );
};
