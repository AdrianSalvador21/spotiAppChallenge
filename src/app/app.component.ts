import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState} from './app.reducer';
import {ActivatedRoute} from '@angular/router';
import {SetAccessDataAction, SetUserDataAction} from './core/actions/user.actions';
import {SpotifyService} from './core/providers/spotify.service';
declare const require;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  language = '';

  constructor(public translateService: TranslateService,
              private route: ActivatedRoute,
              public spotifyService: SpotifyService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    if (!!localStorage.getItem('accessData')) {
      const accessData = JSON.parse(localStorage.getItem('accessData'));
      const action = new SetAccessDataAction( {...accessData} );
      this.store.dispatch( action );
      this.spotifyService.getUser(accessData.access_token).subscribe((data) => {
        const userAction = new SetUserDataAction( data);
        this.store.dispatch( userAction );
      });
    }

    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    this.translateService.setTranslation('en', require('../assets/i18n/en.json'));
    this.store.select('language').subscribe(state => {
      this.language = state;
      this.translateService.use(this.language);
    });
  }
}
