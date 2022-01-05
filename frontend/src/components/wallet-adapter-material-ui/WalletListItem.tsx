/* eslint-disable quote-props */
/* eslint-disable comma-dangle */
/* eslint-disable curly */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import { Button, ListItem, ListItemProps } from '@mui/material';
import { Wallet } from '@solana/wallet-adapter-wallets';
import React, { FC, MouseEventHandler } from 'react';
import { WalletIcon } from './WalletIcon';

interface WalletListItemProps extends Omit<ListItemProps, 'onClick' | 'button'> {
    onClick: MouseEventHandler<HTMLButtonElement>;
    wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({ onClick, wallet, ...props }) => {
    return (
        <ListItem {...props}>
            <Button onClick={onClick} endIcon={<WalletIcon wallet={wallet} />}>
                {wallet.name}
            </Button>
        </ListItem>
    );
};
