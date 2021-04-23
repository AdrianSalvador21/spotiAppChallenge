import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app.reducer';
import {SpotifyService} from '../../../../core/providers/spotify.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {SetLanguageAction} from '../../../../core/actions/languaje.actions';
import {SetSelectedAlbumAction} from '../../../../core/actions/user.actions';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  myPlaylists = [];
  albumsList = [];
  albumId;
  sub: Subscription;

  constructor(private store: Store<AppState>,
              public router: Router,
              public route: ActivatedRoute,
              public spotifyService: SpotifyService) { }

  ngOnInit() {
    this.store.select('user').subscribe(state => {
      if (!!state.userData && !!state.userData.id) {
        this.sub = this.route.params.subscribe(params => {
          if (!!params.id) {
            this.albumId = params.id;
            this.spotifyService.getArtistAlbums(state.accessData.access_token, params.id).subscribe((albumsData) => {
              this.albumsList = albumsData.items;
            });
          }
        });
      }
    });
  }

  goToDetail(id) {
    const action = new SetSelectedAlbumAction( this.albumId );
    this.store.dispatch( action );
    this.router.navigate(['dashboard/tracks', id, 1]);
  }

  backToArtists() {
    this.router.navigateByUrl('/dashboard/artists');
  }
}
