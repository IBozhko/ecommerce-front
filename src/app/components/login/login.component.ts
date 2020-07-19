import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users = [];
  loginForm : FormGroup;
  url: string = 'http://localhost:8080/api/users';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => this.users = data)
    this.loginForm = new FormGroup({
      'login': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  get login() {return this.loginForm.get('login');}
  get password() {return this.loginForm.get('password');}

  onSubmit(userData){
    for (let user of this.users){
      if (user.login == userData.login && user.password == userData.password){
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('loggedIn', 'yes');
        console.log('User with login ' + user.login + ' is logged in')
        console.log('Logged in: ' + localStorage.getItem('loggedIn'));
        window.location.reload();
        break;
      }
      else{
        console.warn('Can not log in, login or password is incorrect')
      }
    }
  }
}
