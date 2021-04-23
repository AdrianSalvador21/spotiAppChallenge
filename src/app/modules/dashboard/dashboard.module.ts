import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule, MatMenuModule} from '@angular/material';
import { AlbumsComponent } from './pages/albums/albums.component';
import { TracksComponent } from './pages/tracks/tracks.component';
import {SharedModule} from '../shared/shared.module';
import { ArtistsComponent } from './pages/artists/artists.component';
import { ReleasesComponent } from './pages/releases/releases.component';

@NgModule({
  declarations: [AlbumsComponent, TracksComponent, ArtistsComponent, ReleasesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'albums/:id',
        component: AlbumsComponent,
        data: {
          title: 'Tu música, en cualquier lugar  | SpotiApp',
          description: '',
        }
      },
      {
        path: 'releases',
        component: ReleasesComponent,
        data: {
          title: 'Tu música, en cualquier lugar  | SpotiApp',
          description: '',
        }
      },
      {
        path: 'artists',
        component: ArtistsComponent,
        data: {
          title: 'Tu música, en cualquier lugar  | SpotiApp',
          description: '',
        }
      },
      {
        path: 'tracks/:id/:type',
        component: TracksComponent,
        data: {
          title: 'Tu música, en cualquier lugar  | SpotiApp',
          description: '',
        }
      },
      { path: '**', pathMatch: 'full', redirectTo: 'releases' },
    ]),
    TranslateModule,
    MatMenuModule,
    MatIconModule,
    SharedModule
  ],
  exports: [],
  providers: [],
})
export class DashboardModule {}
