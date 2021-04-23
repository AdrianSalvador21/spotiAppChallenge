
import * as fromLanguage from '../actions/languaje.actions.js';

const initialStatus: fromLanguage.validLanguages = 'en';

export function filterReducer( state = initialStatus, action: fromLanguage.actions ): fromLanguage.validLanguages {

  switch ( action.type ) {
    case fromLanguage.SET_LANGUAGE:
      return action.language;

    default:
      return state;
  }

}
