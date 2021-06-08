import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let AllTicketsComponent = class AllTicketsComponent {
    constructor(http, cookie) {
        this.http = http;
        this.cookie = cookie;
        this.tickets = [];
    }
    ngOnInit() {
        this.table();
    }
    table() {
        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa(this.cookie.get('login') + ':' + this.cookie.get('password'))
        });
        this.http.get('http://localhost:8098/ticket', { headers, responseType: 'json' })
            .subscribe(req => {
            console.log(req);
            this.tickets = req;
        });
    }
    sortByIdStart() {
        this.tickets.sort((a, b) => a.id > b.id ? 1 : -1);
    }
    sortByIdEnd() {
        this.tickets.sort((a, b) => a.id < b.id ? 1 : -1);
    }
    sortByNameStart() {
        this.tickets.sort((a, b) => a.name > b.name ? 1 : -1);
    }
    sortByNameEnd() {
        this.tickets.sort((a, b) => a.name < b.name ? 1 : -1);
    }
    sortByDateStart() {
        this.tickets.sort((a, b) => a.desired_resolution_date < b.desired_resolution_date ? 1 : -1);
    }
    sortByDateEnd() {
        this.tickets.sort((a, b) => a.desired_resolution_date > b.desired_resolution_date ? 1 : -1);
    }
    sortByUrgencyStart() {
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
    sortByUrgencyEnd() {
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
    sortByStatusStart() {
        this.tickets.sort((a, b) => a.state > b.state ? 1 : -1);
    }
    sortByStatusEnd() {
        this.tickets.sort((a, b) => a.state < b.state ? 1 : -1);
    }
};
AllTicketsComponent = __decorate([
    Component({
        selector: 'app-all-tickets',
        templateUrl: './all-tickets.component.html',
        styleUrls: ['./all-tickets.component.scss']
    })
], AllTicketsComponent);
export { AllTicketsComponent };
//# sourceMappingURL=all-tickets.component.js.map