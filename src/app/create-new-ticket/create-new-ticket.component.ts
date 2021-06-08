import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-create-new-ticket',
  templateUrl: './create-new-ticket.component.html',
  styleUrls: ['./create-new-ticket.component.scss']
})
export class CreateNewTicketComponent implements OnInit {
  form: FormGroup;
  tickets: any = [];
  urgencys: any = [];
  categoryes: any = [];

  constructor(private http: HttpClient,
              private cookie: CookieService) {
  }

  ngOnInit(): void {
    this.urgency();
    this.category();
    this.form = new FormGroup({
      category: new FormControl('Application & Services'),
      name: new FormControl(''),
      description: new FormControl(''),
      urgency: new FormControl(''),
      desired_resolution_date: new FormControl(''),
      // add_attachment: new FormControl(''),
      comment: new FormControl('')
    });
  }

  urgency(): void {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
    });
    this.http.get('http://localhost:8098/ticket/urgency', {headers, responseType: 'json'})
      .subscribe(req => {
        console.log(req);
        this.urgencys = req;
      });
  }

  category(): void {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
    });
    this.http.get('http://localhost:8098/ticket/category', {headers, responseType: 'json'})
      .subscribe(req => {
        console.log(req);
        this.categoryes = req;
      });
  }

  submit(): void {
    console.log(this.form.value);
    // send to server
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
    });
    this.http.post('http://localhost:8098/ticket/createTicket', this.form.value, {headers, responseType: 'json'})
      .subscribe(req => {
        console.log(req);
      });
    // this.http.post<FormGroup>('http://localhost:8098/finalhomework/person', this.form.value)
    //   .subscribe(
    //     (res) => {
    //       console.log(res);
    //     },
    //     (err) => console.log(err));




    // this.http.get('https://jsonplaceholder.typicode.com/posts/1') // http://localhost:8098/finalhomework/person
    //   .subscribe(response => {
    //     console.log(response);
    //   });
  }
}
