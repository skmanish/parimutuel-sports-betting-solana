/* eslint-disable quote-props */
/* eslint-disable comma-dangle */
/* eslint-disable curly */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
import { Button, ButtonProps } from '@mui/material';
import React, { FC, MouseEventHandler, useCallback } from 'react';
import { useWalletDialog } from './useWalletDialog';

export const WalletDialogButton: FC<ButtonProps> = ({
    children = 'Select Wallet',
    color = 'primary',
    variant = 'contained',
    type = 'button',
    onClick,
    ...props
}) => {
    const { setOpen } = useWalletDialog();

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (event) => {
            if (onClick) onClick(event);
            if (!event.defaultPrevented) setOpen(true);
        },
        [onClick, setOpen]
    );

    return (
        <Button color={color} variant={variant} type={type} onClick={handleClick} {...props}>
            {children}
        </Button>
    );
};
