import * as fromUser from '../actions/user.actions';

export interface UserState {
  accessData: any;
  userData: any;
  selectedAlbum: any;
  artistSearch: any;
}

const initialStatus: UserState = {
  accessData: {},
  userData: {},
  selectedAlbum: null,
  artistSearch: null
};

export function userReducer(state = initialStatus, action: fromUser.actions): any {
  switch (action.type) {
    case fromUser.SET_ACCESS_DATA:
      return {
        ...state,
        accessData: { ...state.accessData, ...action.accessData },
      };

    case fromUser.SET_USER_DATA:
      return {
        ...state,
        userData: { ...state.userData, ...action.userData },
      };

    case fromUser.SET_SELECTED_ALBUM:
      return {
        ...state,
        selectedAlbum: action.albumId,
      };

    case fromUser.SET_ARTIST_SEARCH:
      return {
        ...state,
        artistSearch: action.artistSearch,
      };

    default:
      return state;
  }
}
