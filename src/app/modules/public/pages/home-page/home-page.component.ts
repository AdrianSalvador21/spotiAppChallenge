import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app.reducer';
import {SpotifyService} from '../../../../core/providers/spotify.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {SetAccessDataAction, SetUserDataAction} from '../../../../core/actions/user.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(public store: Store<AppState>,
              private route: ActivatedRoute,
              public router: Router,
              private spinner: NgxSpinnerService,
              public spotifyService: SpotifyService) {
    this.spinner.show();
  }

  ngOnInit() {
    this.spinner.show();
    this.route.fragment.pipe(
        map(fragment => new URLSearchParams(fragment)),
        map(params => ({access_token: params.get('access_token'), token_type: params.get('token_type'),
          expires_in: params.get('expires_in'), state: params.get('state'), error: params.get('error')
        }))
    ).subscribe(res => {
        if (!!res.access_token) {
          localStorage.setItem('accessData', JSON.stringify(res));
          const action = new SetAccessDataAction( {...res} );
          this.store.dispatch( action );
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard').then(() => {
            });
          }, 1500);
          this.spotifyService.getUser(res.access_token).subscribe((data) => {
            const userAction = new SetUserDataAction( data );
            this.store.dispatch( userAction );
          });
        } else if (!!localStorage.getItem('accessData')) {
          const accessData = JSON.parse(localStorage.getItem('accessData'));
          const action = new SetAccessDataAction( {...accessData} );
          this.store.dispatch( action );
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard').then(() => {
            });
          }, 1500);
        } else {
          setTimeout(() => {
            this.spinner.hide();
          }, 1500);
        }
      });
  }
}
