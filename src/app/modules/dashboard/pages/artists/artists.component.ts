import {AfterViewInit, Component, OnInit, ViewChild, Renderer2} from '@angular/core';
import {SpotifyService} from '../../../../core/providers/spotify.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app.reducer';
import {Router} from '@angular/router';
import {SetLanguageAction} from '../../../../core/actions/languaje.actions';
import {SetArtistSearchAction} from '../../../../core/actions/user.actions';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', { static: false }) searchInput: any;
  public artists = [];
  public query = 'lenny';
  public accessToken;

  constructor(public spotifyService: SpotifyService, private store: Store<AppState>, public router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.store.select('user').subscribe(state => {
      if (!!state.artistSearch) {
        this.query = state.artistSearch;
        this.searchInput.nativeElement.value = this.query;
      }
      if (!!state.userData && !!state.userData.id) {
        this.accessToken = state.accessData.access_token;
        this.spotifyService.getQuerySearch(state.accessData.access_token, this.query).subscribe((artists) => {
          this.artists = artists.items;
        });
      }
    });
  }

  search(inputValue) {
    if (inputValue === '') {
      return;
    }
    this.query = inputValue;
    this.spotifyService.getQuerySearch(this.accessToken, inputValue).subscribe((artists) => {
      this.artists = artists.items;
    });
  }

  goToAlbums(artistId) {
    const action = new SetArtistSearchAction( this.query );
    this.store.dispatch( action );
    this.router.navigate(['/dashboard/albums', artistId]);
  }

}
