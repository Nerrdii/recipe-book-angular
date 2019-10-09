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
      apiKey: 'AIzaSyAnEoUzYbM7pHV6quOjRX1jQKfVn_68qpU',
      authDomain: 'recipe-book-angular-44b2c.firebaseapp.com',
      databaseURL: 'https://recipe-book-angular-44b2c.firebaseio.com',
      projectId: 'recipe-book-angular-44b2c',
      storageBucket: '',
      messagingSenderId: '688209381830',
      appId: '1:688209381830:web:786fa5e7d0b7696743cac7',
      measurementId: 'G-KRQ9HTDZEH'
    });
  }
}
