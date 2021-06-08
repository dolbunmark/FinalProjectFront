import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
let EditTicketComponent = class EditTicketComponent {
    constructor() { }
    ngOnInit() {
        this.form = new FormGroup({
            category: new FormControl(''),
            name: new FormControl(''),
            disription: new FormControl(''),
            urgency: new FormControl(''),
            date: new FormControl(''),
            add_attachment: new FormControl(''),
            comment: new FormControl('')
        });
    }
    submit() {
        console.log('form', this.form.value);
    }
};
EditTicketComponent = __decorate([
    Component({
        selector: 'app-edit-ticket',
        templateUrl: './edit-ticket.component.html',
        styleUrls: ['./edit-ticket.component.scss']
    })
], EditTicketComponent);
export { EditTicketComponent };
//# sourceMappingURL=edit-ticket.component.js.map