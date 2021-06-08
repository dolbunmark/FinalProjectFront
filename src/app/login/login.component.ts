import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, PatternValidator, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email, // email
        Validators.required, // от пустого
        Validators.pattern(/^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/), // unicode
        Validators.maxLength(100) // максимальное число символов
      ]),
      password: new FormControl(null, [
        Validators.required, // от пустого
        Validators.pattern(/\d/), // проверяем, есть ли у введенного пароля цифра
        Validators.pattern(/[A-Z]/), // проверьте, имеет ли введенный пароль заглавные буквы
        Validators.pattern(/[a-z]/), // проверьте, есть ли во введенном пароле строчная буква
        Validators.pattern(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/), // проверьте, есть ли во введенном пароле специальные символы
        Validators.minLength(6), // Минимум 6 символов
        Validators.maxLength(20) // Максимум 20 символов
      ])
    });
  }


  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
  }

  submit(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa(this.form.value.email + ':' + this.form.value.password)
      });

      this.http.get('http://localhost:8098/test', {headers, responseType: 'json'} )
        .subscribe( response => {
          console.log(this.form);
          this.cookieService.set('login', this.form.value.email);
          this.cookieService.set('password', this.form.value.password);
          this.router.navigate(['/tickets']);
      });
    }
  }
}
