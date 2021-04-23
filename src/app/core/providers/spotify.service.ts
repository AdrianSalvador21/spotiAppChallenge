import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class SpotifyService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, public router: Router) {
  }

  getQuery( query: string, token ) {
    const url = `${this.apiUrl}${ query }`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, { headers });
  }

  getPlaylist( token, id ) {
    this.spinner.show();
    return this.getQuery(`playlists/${id}`, token)
      .pipe(
        map( data => {
          this.spinner.hide();
          return data;
        }),
        catchError((e) => {
          this.validateStatus(e.status);
          this.spinner.hide();
          return throwError(false);
        })
      );
  }

  getAlbum( token, id ) {
    this.spinner.show();
    return this.getQuery(`albums/${id}`, token)
      .pipe(
        map( data => {
          this.spinner.hide();
          return data;
        }),
        catchError((e) => {
          this.validateStatus(e.status);
          this.spinner.hide();
          return throwError(false);
        })
      );
  }

  getPlaylistTracks( token, id ) {
    this.spinner.show();
    return this.getQuery(`playlists/${id}/tracks?limit=30`, token)
      .pipe(
        map( data => {
          this.spinner.hide();
          return data as any;
        }),
        catchError((e) => {
          this.validateStatus(e.status);
          this.spinner.hide();
          return throwError(false);
        })
      );
  }

  getAlbumTracks( token, id ) {
    this.spinner.show();
    return this.getQuery(`albums/${id}/tracks?limit=30`, token)
      .pipe(
        map( data => {
          this.spinner.hide();
          return data as any;
        }),
        catchError((e) => {
          this.validateStatus(e.status);
          this.spinner.hide();
          return throwError(false);
        })
      );
  }

  getArtistAlbums( token, id ) {
    this.spinner.show();
    return this.getQuery(`artists/${id}/albums?limit=18`, token)
      .pipe(
        map( data => {
          this.spinner.hide();
          return data as any;
        }),
        catchError((e) => {
          this.validateStatus(e.status);
          this.spinner.hide();
          return throwError(false);
        })
      );
  }

  getFeaturedPlaylists(token, userId) {
    this.spinner.show();
    return this.getQuery(`browse/featured-playlists`, token)
      .pipe(
        map( data => {
          this.spinner.hide();
          return data as any;
        }),
        catchError((e) => {
          this.validateStatus(e.status);
          this.spinner.hide();
          return throwError(false);
        })
      );
  }

  getUser(token) {
    this.spinner.show();
    return this.getQuery(`me`, token)
      .pipe(
        map( data => {
          this.spinner.hide();
          return data;
        }),
        catchError((e) => {
          this.spinner.hide();
          this.validateStatus(e.status);
          return throwError(false);
        })
      );
  }

  getQuerySearch(token, query) {
    // search?q=luis%20miguel
    return this.getQuery(`search?q=${query}&type=artist&limit=12`, token)
      .pipe(
        map( (data) => {
          // @ts-ignore
          return data.artists;
        }),
        catchError((e) => {
          this.spinner.hide();
          this.validateStatus(e.status);
          return throwError(false);
        })
      );
  }

  login() {
    const clientId = '62b87649ed6d4b5c9a77b2474c0d8c1c';
    let url = 'https://accounts.spotify.com/authorize';
    url += `?client_id=${clientId}`;
    url += `&response_type=token`;
    url += `&redirect_uri=${environment.redirectUrl}`;
    url += `&show_dialog=true`;
    window.location.href = url;
  }

  logout() {
    localStorage.removeItem('accessData');
    this.router.navigateByUrl('/');
  }

  validateStatus(status) {
    if (status === 401) {
      localStorage.removeItem('accessData');
      this.router.navigateByUrl('/');
    }
  }

}
