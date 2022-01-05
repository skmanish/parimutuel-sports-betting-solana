/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import { createContext, useContext } from 'react';

export interface WalletDialogContextState {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const WalletDialogContext = createContext<WalletDialogContextState>({} as WalletDialogContextState);

export function useWalletDialog(): WalletDialogContextState {
    return useContext(WalletDialogContext);
}
