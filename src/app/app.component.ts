import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBaJ-vlleqF1yHTPkCCV2ScFUpCAz8sjw4',
      authDomain: 'recipe-book-angular-ad61c.firebaseapp.com',
      databaseURL: 'https://recipe-book-angular-ad61c.firebaseio.com',
      projectId: 'recipe-book-angular-ad61c',
      storageBucket: 'recipe-book-angular-ad61c.appspot.com',
      messagingSenderId: '182147668530'
    });
  }
}
