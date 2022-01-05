/* eslint-disable quote-props */
/* eslint-disable comma-dangle */
/* eslint-disable curly */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import React, { FC, ReactNode, useState } from 'react';
import { WalletDialogContext } from './useWalletDialog';
import { WalletDialog, WalletDialogProps } from './WalletDialog';

export interface WalletDialogProviderProps extends WalletDialogProps {
    children: ReactNode;
}

export const WalletDialogProvider: FC<WalletDialogProviderProps> = ({ children, ...props }) => {
    const [open, setOpen] = useState(false);

    return (
        <WalletDialogContext.Provider
            value={{
                open,
                setOpen,
            }}
        >
            {children}
            <WalletDialog {...props} />
        </WalletDialogContext.Provider>
    );
};
