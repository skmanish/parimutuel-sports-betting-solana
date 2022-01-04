export type UserEvent = {
    eventId?: string,
    transactionSignature?: string,
    userChoice?: number,
    userSolCents?: number,
    winningsSolCents?: number,
    winningsSignature?: string,
}
export type User = {
    userPublicKeyBase58: string,
    userEvents: UserEvent[],
};

export const defaultUser = {
  userPublicKeyBase58: '',
  userEvents: [] as UserEvent[],
};
