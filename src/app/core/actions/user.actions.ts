import { Action } from '@ngrx/store';

export const SET_ACCESS_DATA = '[User] Set Access Data';
export const SET_USER_DATA = '[User] Set User Data';
export const SET_SELECTED_ALBUM = '[User] Set Selected Album';
export const SET_ARTIST_SEARCH = '[User] Set Artist Search';

export class SetAccessDataAction implements Action {
  readonly type = SET_ACCESS_DATA;
  constructor( public accessData: any ) {}
}

export class SetUserDataAction implements Action {
  readonly type = SET_USER_DATA;
  constructor( public userData: any ) {}
}

export class SetSelectedAlbumAction implements Action {
  readonly type = SET_SELECTED_ALBUM;
  constructor( public albumId: any ) {}
}

export class SetArtistSearchAction implements Action {
  readonly type = SET_ARTIST_SEARCH;
  constructor( public artistSearch: any ) {}
}

export type actions = SetAccessDataAction | SetUserDataAction | SetSelectedAlbumAction | SetArtistSearchAction;
