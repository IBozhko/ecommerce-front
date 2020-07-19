import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  currentUser: User = new User();
  editForm: FormGroup;
  invalidLogin: boolean = true;
  roles = ['admin', 'user'];

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.editForm = new FormGroup({
      'firstName': new FormControl(this.currentUser.firstName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      'lastName': new FormControl(this.currentUser.lastName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      'password': new FormControl(this.currentUser.password, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'role': new FormControl(this.currentUser.role, [
        Validators.required
      ])
    });
  }

  get firstName() {return this.editForm.get('firstName');}
  get lastName() {return this.editForm.get('lastName');}
  get password() {return this.editForm.get('password');}
  get role() {return this.editForm.get('role');}

  onSubmit(userData){
    let newUser: User = new User();
    newUser.id = this.currentUser.id;
    newUser.firstName = userData.firstName;
    newUser.lastName = userData.lastName;
    newUser.login = this.currentUser.login;
    newUser.password = userData.password;
    newUser.role = userData.role;

    this.userService.updateUser(newUser).subscribe(
      () =>{
        this.editForm.reset();
        this.router.navigate(['userPage']);
      }
    );
  }
}