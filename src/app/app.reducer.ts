import { ActionReducerMap } from '@ngrx/store';

import * as fromLanguage from './core/reducers/languaje.reducer';
import * as fromUser from './core/reducers/user.reducer';
import * as fromLanguageActions from './core/actions/languaje.actions';

export interface AppState {
  language: fromLanguageActions.validLanguages;
  user: fromUser.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  language: fromLanguage.filterReducer,
  user: fromUser.userReducer
};
