import {useWallet} from '@solana/wallet-adapter-react';
import {useState, createContext} from 'react';
import {userApi} from '../api/userApi';
import {defaultUser, User, UserEvent} from '../types/user';

export const UserContext = createContext({
  ...defaultUser,
  updateUserEvents: async () => false,
});

interface Props {
  children?: any
}

// userEvents value passed down by this provider are only updated
// when the wallet is changed.
export const UserContextProvider = (props: Props) => {
  const wallet = useWallet();
  const [user, setUser] = useState<User>(defaultUser);
  console.log('UserContextProvider refreshing');

  const updateUserEvents = async () => {
    if (!user.userPublicKeyBase58) return false;
    const response = await userApi.getMyEvents(user);
    if (JSON.stringify(
      response as UserEvent[]) != JSON.stringify(user.userEvents)) {
      setUser({
        ...user,
        userEvents: response as UserEvent[],
      });
      return true;
    }
    return false;
  };

  const getProviderValue = async () => {
    if (
      // Either of the public keys must be defined
      !(!user.userPublicKeyBase58 && !wallet.publicKey?.toBase58()) &&
      (user.userPublicKeyBase58 != wallet.publicKey?.toBase58())) {
      const newUser = {
        userPublicKeyBase58: wallet.publicKey?.toBase58() as string,
        userEvents: user.userEvents,
      };
      const response = await userApi.getMyEvents(newUser);
      setUser({
        ...newUser,
        userEvents: await response as UserEvent[],
      });
    }
    return {
      ...user,
      updateUserEvents: updateUserEvents,
    };
  };
  const getProviderValueSync = () => {
    getProviderValue();
    return {
      ...user,
      updateUserEvents: updateUserEvents,
    };
  };
  return (
    <UserContext.Provider value={getProviderValueSync()}>
      {props.children}
    </UserContext.Provider>
  );
};
