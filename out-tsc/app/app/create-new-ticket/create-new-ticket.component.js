import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
let CreateNewTicketComponent = class CreateNewTicketComponent {
    constructor(http, cookie) {
        this.http = http;
        this.cookie = cookie;
        this.tickets = [];
        this.urgencys = [];
    }
    ngOnInit() {
        this.urgency();
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
    urgency() {
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
        });
        this.http.get('http://localhost:8098/urgency', { headers, responseType: 'json' })
            .subscribe(req => {
            console.log(req);
            this.urgencys = req;
        });
    }
    submit() {
        console.log(this.form.value);
        // send to server
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
        });
        this.http.post('http://localhost:8098/ticket/createTicket', this.form.value, { headers, responseType: 'json' })
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
};
CreateNewTicketComponent = __decorate([
    Component({
        selector: 'app-create-new-ticket',
        templateUrl: './create-new-ticket.component.html',
        styleUrls: ['./create-new-ticket.component.scss']
    })
], CreateNewTicketComponent);
export { CreateNewTicketComponent };
//# sourceMappingURL=create-new-ticket.component.js.map