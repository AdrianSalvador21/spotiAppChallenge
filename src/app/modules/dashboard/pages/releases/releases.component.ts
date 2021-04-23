import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app.reducer';
import {Router} from '@angular/router';
import {SpotifyService} from '../../../../core/providers/spotify.service';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {
  myPlaylists = [];

  constructor(private store: Store<AppState>,
              public router: Router,
              public spotifyService: SpotifyService) { }

  ngOnInit() {
    this.store.select('user').subscribe(state => {
      if (!!state.userData && !!state.userData.id) {
        this.spotifyService.getFeaturedPlaylists(state.accessData.access_token, state.userData.id).subscribe((data) => {
          this.myPlaylists = data.playlists.items;
        });
      }
    });
  }

  goToDetail(id) {
    this.router.navigate(['dashboard/tracks', id, 2]);
  }
}
