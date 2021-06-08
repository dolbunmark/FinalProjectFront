import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {
  form: FormGroup;
  ticket: any = {};
  id: any = {};
  constructor(
    private ActivatedRouter: ActivatedRoute,
    private http: HttpClient,
    private cookie: CookieService,
    private AcivatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.AcivatedRouter.params.subscribe((param: Params) => { // получение id
      this.id = param;
    });


    this.form = new FormGroup({
      category: new FormControl(''),
      name: new FormControl(''),
      disription: new FormControl(''),
      urgency: new FormControl(''),
      date: new FormControl(''),
      add_attachment: new FormControl(''),
      comment: new FormControl(''),
    });
    this.ActivatedRouter.params.subscribe((param: Params) => {
      console.log(param);
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
      });
      this.http.get(`http://localhost:8098/ticket/${param.id}`, {headers, responseType: 'json'})
        .subscribe(req => {
          console.log(req);
          this.ticket = req;
        });
    });
  }
  // tslint:disable-next-line:typedef
  submit() {
    console.log( 'form', this.form.value);
  }


}
