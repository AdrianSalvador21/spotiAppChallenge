import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotifyService} from '../../../../core/providers/spotify.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app.reducer';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit, OnDestroy {
  public sub: Subscription;
  public playlistData;
  public albumId;
  public playlistTracks;
  public tracksType;

  constructor(public route: ActivatedRoute,
              public spotifyService: SpotifyService,
              public router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select('user').subscribe(state => {

      console.log(state);
      this.albumId = state.selectedAlbum;

      if (!!state.userData && !!state.userData.id) {
        this.sub = this.route.params.subscribe(params => {
          if (!!params.id && !!params.type) {
            this.tracksType = params.type;
            if (params.type === '2') {


              this.spotifyService.getPlaylist(state.accessData.access_token, params.id).subscribe((playlistData) => {
                this.playlistData = playlistData;
              });

              this.spotifyService.getPlaylistTracks(state.accessData.access_token, params.id).subscribe((playlistTracks) => {
                this.playlistTracks = playlistTracks.items;
              });


            } else if (params.type === '1') {
              this.spotifyService.getAlbum(state.accessData.access_token, params.id).subscribe((playlistData) => {
                this.playlistData = playlistData;
              });

              this.spotifyService.getAlbumTracks(state.accessData.access_token, params.id).subscribe((playlistTracks) => {
                this.playlistTracks = playlistTracks.items;
                console.log(this.playlistTracks);
              });
            }
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goToSpotify(url) {
    window.open(url, '_blank');
  }

  goToAlbums() {
    if (this.tracksType === '1') {
      if (!!this.albumId) {
        this.router.navigateByUrl(`/dashboard/albums/${this.albumId}`);
      } else {
        this.router.navigateByUrl(`/dashboard/artists`);
      }
    } else  {
      this.router.navigateByUrl('/dashboard/releases');
    }
  }

}
