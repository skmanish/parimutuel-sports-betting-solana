use anchor_lang::error;

#[error]
pub enum ErrorCode {
    #[msg("Can not start an event that is not in create state.")]
    CannotStartEventNotInCreatedState,
    #[msg("Can not end an event that is not in start state.")]
    CannotEndEventNotInStartState,
    #[msg("Can not resolve an event that is not in ended state.")]
    CannotResolveEventNotInEndedState,
    #[msg("Can not add user bet to an event that is not in started state.")]
    CannotAddUserBetToEventNotInStartedState,
}