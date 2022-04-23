//lo que elta entre parentesis apunta al reducer que ejecuto la action
// [Auth] Login , apunta al reducer de authReducer


export const types = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',
    uiStartLoading: '[UI] Start Loading',
    uiFinishLoading: '[UI] Finish Loading',


    notesAddNew: '[Notes] New note',
    notesActive: '[Notes] Set active note',
    notesLoad: '[Notes] Load notes',
    notesUpdated: '[Notes] Update note',
    notesFileUrl: '[Notes] Update image url',
    notesDelete: '[Notes] Delete note',
    notesLogoutCleaning: '[Notes] Logout Cleaning',
}
