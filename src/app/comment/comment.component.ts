import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comment: any = [];
  ticket: any = {};
  id: any = {};

  form: any = new FormGroup({
    text: new FormControl(''),
    id: new FormControl(''),
    user: new FormControl('')
  });


  constructor(private http: HttpClient,
              private cookie: CookieService,
              private router: Router,
              private AcivatedRouter: ActivatedRoute) {
  }

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
    this.http.get(`http://localhost:8098/comment/${this.id.id}`, {headers, responseType: 'json'})
      .subscribe(req => {
        this.ticket = req;
      });
  }

  tableFive(): void {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
    });
    this.http.get(`http://localhost:8098/comment/five/${this.id.id}`, {headers, responseType: 'json'})
      .subscribe(req => {
        this.ticket = req;
      });
  }

  addComment(): void {
    const name = this.cookie.get('login');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
    });
    this.form.patchValue({user: name, id: this.id.id});
    console.log(this.form);
    this.http.post(`http://localhost:8098/comment`, {...this.form.value}, {headers, responseType: 'json'})
      .subscribe(req => {
        // console.log(req);
        this.comment = req;
        this.tableFive();
      });
  }
}
