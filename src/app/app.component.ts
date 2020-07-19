import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-shop-front';
  loggedIn: string = 'no';

  constructor(
  ){}

  ngOnInit(){
    this.loggedIn = localStorage.getItem('loggedIn')
  }

  logout(){
    localStorage.setItem('currentUser', null);
    localStorage.setItem('loggedIn', 'no');
    window.location.reload();
  }
}
