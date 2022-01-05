/* eslint-disable quote-props */
/* eslint-disable comma-dangle */
/* eslint-disable curly */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import { Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Wallet } from '@solana/wallet-adapter-wallets';
import React, { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';

const Img = styled('img')(({ theme }: { theme: Theme }) => ({
    width: theme.spacing(3),
    height: theme.spacing(3),
}));

export interface WalletIconProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    wallet: Wallet | null;
}

export const WalletIcon: FC<WalletIconProps> = ({ wallet, ...props }) => {
    return wallet && <Img src={wallet.icon} alt={`${wallet.name} icon`} {...props} />;
};
