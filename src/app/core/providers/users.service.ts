import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
  }
}
