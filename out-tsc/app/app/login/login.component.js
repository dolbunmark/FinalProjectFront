import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
let LoginComponent = class LoginComponent {
    constructor(http, router, cookieService) {
        this.http = http;
        this.router = router;
        this.cookieService = cookieService;
    }
    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [
                Validators.email,
                Validators.required,
                Validators.pattern(/^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/),
                Validators.maxLength(100) // максимальное число символов
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.pattern(/\d/),
                Validators.pattern(/[A-Z]/),
                Validators.pattern(/[a-z]/),
                Validators.pattern(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/),
                Validators.minLength(6),
                Validators.maxLength(20) // Максимум 20 символов
            ])
        });
    }
    submit() {
        console.log(this.form.value);
        if (this.form.valid) {
            const headers = new HttpHeaders({
                Authorization: 'Basic ' + btoa(this.form.value.email + ':' + this.form.value.password)
            });
            this.http.get('http://localhost:8098/test', { headers, responseType: 'json' })
                .subscribe(response => {
                console.log(this.form);
                this.cookieService.set('login', this.form.value.email);
                this.cookieService.set('password', this.form.value.password);
                this.router.navigate(['/tickets']);
            });
        }
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map