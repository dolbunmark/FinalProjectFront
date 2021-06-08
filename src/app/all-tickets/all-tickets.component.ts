import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.scss']
})
export class AllTicketsComponent implements OnInit {
  tickets: any = [];

  private data: any;

  constructor(private http: HttpClient,
              private cookie: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.table();
  }

  table(): void {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
    });
    this.http.get('http://localhost:8098/ticket', {headers, responseType: 'json'})
      .subscribe(req => {
        console.log(req);
        this.tickets = req;
      });
  }

  sortByIdStart(): void { // сортировка id в вверх
    this.tickets.sort((a, b) => a.id > b.id ? 1 : -1);
  }

  sortByIdEnd(): void { // сортировка id в низ
    this.tickets.sort((a, b) => a.id < b.id ? 1 : -1);
  }

  sortByNameStart(): void { // сортировка name в вверх
    this.tickets.sort((a, b) => a.name > b.name ? 1 : -1);
  }

  sortByNameEnd(): void { // сортировка name в низ
    this.tickets.sort((a, b) => a.name < b.name ? 1 : -1);
  }

  sortByDateStart(): void { // сортировка date в вверх
    this.tickets.sort((a, b) => a.desired_resolution_date < b.desired_resolution_date ? 1 : -1);
  }

  sortByDateEnd(): void { // сортировка date в низ
    this.tickets.sort((a, b) => a.desired_resolution_date > b.desired_resolution_date ? 1 : -1);
  }

  sortByUrgencyStart(): void { // сортировка urgency в вверх
    this.tickets.forEach(ticket => {
      if (ticket.urgency === 'Critical') {
        ticket.urgency = 4;
      }
      if (ticket.urgency === 'High') {
        ticket.urgency = 3;
      }
      if (ticket.urgency === 'Average') {
        ticket.urgency = 2;
      }
      if (ticket.urgency === 'Low') {
        ticket.urgency = 1;
      }
    });
    this.tickets.sort((a, b) => a.urgency > b.urgency ? 1 : -1);
    this.tickets.forEach(ticket => {
      if (ticket.urgency === 4) {
        ticket.urgency = 'Critical';
      }
      if (ticket.urgency === 3) {
        ticket.urgency = 'High';
      }
      if (ticket.urgency === 2) {
        ticket.urgency = 'Average';
      }
      if (ticket.urgency === 1) {
        ticket.urgency = 'Low';
      }
    });
  }

  sortByUrgencyEnd(): void { // сортировка urgency в низ
    this.tickets.forEach(ticket => {
      if (ticket.urgency === 'Critical') {
        ticket.urgency = 4;
      }
      if (ticket.urgency === 'High') {
        ticket.urgency = 3;
      }
      if (ticket.urgency === 'Average') {
        ticket.urgency = 2;
      }
      if (ticket.urgency === 'Low') {
        ticket.urgency = 1;
      }
    });
    this.tickets.sort((a, b) => a.urgency < b.urgency ? 1 : -1);
    this.tickets.forEach(ticket => {
      if (ticket.urgency === 4) {
        ticket.urgency = 'Critical';
      }
      if (ticket.urgency === 3) {
        ticket.urgency = 'High';
      }
      if (ticket.urgency === 2) {
        ticket.urgency = 'Average';
      }
      if (ticket.urgency === 1) {
        ticket.urgency = 'Low';
      }
    });
  }

  sortByStatusStart(): void { // сортировка status в вверх
    this.tickets.sort((a, b) => a.state > b.state ? 1 : -1);
  }

  sortByStatusEnd(): void { // сортировка status в низ
    this.tickets.sort((a, b) => a.state < b.state ? 1 : -1);
  }

  logout(): void { // выход
    this.cookie.deleteAll('/');
    this.router.navigate(['/']);
  }

  outuput(str:string){
    let strLover = str.toLowerCase();
    let reg = new RegExp(`(.*${strLover}+.*)`);
    let array = new Array;
    this.tickets.forEach(element => {
      let item = element.name.toLowerCase();

      if(item.search(reg) === 0){
        array.push(element);
      }
    });

    array.forEach(element => {
      let i = this.tickets.indexOf(element);
      this.tickets.splice(i,1);
      this.tickets.unshift(element);
    });
  }

}


