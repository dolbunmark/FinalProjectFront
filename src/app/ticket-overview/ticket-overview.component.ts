import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.scss']
})
export class TicketOverviewComponent implements OnInit {

  ticket: any = {};

  constructor(
    private AcivatedRouter: ActivatedRoute,
    private http: HttpClient,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.AcivatedRouter.params.subscribe((param: Params) => { // получение id
      // console.log(param);
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
      });
      this.http.get(`http://localhost:8098/ticket/${param.id}`, {headers, responseType: 'json'})
        .subscribe(req => {
          // console.log(req);
          this.ticket = req;
        });
    });
  }
}
