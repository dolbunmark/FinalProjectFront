import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  history: any = [];
  ticket: any = {};
  id: any = {};

  constructor(private http: HttpClient,
              private cookie: CookieService,
              private router: Router,
              private AcivatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    this.AcivatedRouter.params.subscribe((param: Params) => { // получение id
      this.id = param;
      this.tableFive();
    });
  }

  table(): void {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
    });
    this.http.get(`http://localhost:8098/history/${this.id.id}`, {headers, responseType: 'json'})
      .subscribe(req => {
        this.history = req;
      });
  }

  tableFive(): void {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
    });
    this.http.get(`http://localhost:8098/history/five/${this.id.id}`, {headers, responseType: 'json'})
      .subscribe(req => {
        this.history = req;
      });
  }
}
