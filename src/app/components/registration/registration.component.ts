import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/common/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  users = []
  registrationForm: FormGroup;
  roles = ['admin', 'user'];
  invalidLogin: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => this.users = data);
    this.registrationForm = new FormGroup({
      'firstName': new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      'lastName': new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      'login': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'role': new FormControl('', [
        Validators.required
      ])
    });
  }

  get firstName() {return this.registrationForm.get('firstName');}
  get lastName() {return this.registrationForm.get('lastName');}
  get login() {return this.registrationForm.get('login');}
  get password() {return this.registrationForm.get('password');}
  get role() {return this.registrationForm.get('role');}

  onSubmit(userData){
    let newUser: User = new User();
    newUser.firstName = userData.firstName;
    newUser.lastName = userData.lastName;
    newUser.login = userData.login;
    newUser.password = userData.password;
    newUser.role = userData.role;

    this.userService.saveUser(newUser).subscribe(
      (data: User) =>{
        console.log(data);
        this.registrationForm.reset();
        this.router.navigate(['products']);
      }
    );
  }

  loginValidator(form){
    let login: string = form.login;
    if (login.length > 3){
      for (let user of this.users){
        if (login == user.login){
          console.log('cant login')
          this.invalidLogin = true;
          break;
        }
        else{
          console.log('can login')
          this.invalidLogin = false;
        }
      }
    }
  }
}
