import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {SetLanguageAction, validLanguages} from '../../../../core/actions/languaje.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app.reducer';
import {ThemeService} from '../../../theme/theme.service';
import {SpotifyService} from '../../../../core/providers/spotify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {
  public language: validLanguages = 'en';
  public isLogged = false;
  public isDarkTheme = true;

  constructor(public store: Store<AppState>,
              public spotifyService: SpotifyService,
              private themeService: ThemeService) { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.isLogged = !!localStorage.getItem('accessData');
    this.isDarkTheme = !!localStorage.getItem('selectedTheme') ? localStorage.getItem('selectedTheme') !== 'light' : true;
  }

  changeLanguage() {
    this.language = this.language === 'en' ? 'es' : 'en';
    const action = new SetLanguageAction( this.language );
    this.store.dispatch( action );
  }

  toggle() {
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      localStorage.setItem('selectedTheme', 'dark');
      this.themeService.setTheme('dark');
    } else {
      localStorage.setItem('selectedTheme', 'light');
      this.themeService.setTheme('light');
    }
  }

  login() {
    this.spotifyService.login();
  }

  logout() {
    this.spotifyService.logout();
  }
}
