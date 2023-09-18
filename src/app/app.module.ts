import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import {
  StoreRouterConnectingModule,
  FullRouterStateSerializer,
} from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { provideFirebaseApp, getApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { reducers } from "./store/app.reducers";
import { AuthEffects } from "./auth/store/auth.effects";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "my-app" }),
    HttpClientModule,
    AppRoutingModule,
    ShoppingListModule,
    SharedModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: FullRouterStateSerializer,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyAnEoUzYbM7pHV6quOjRX1jQKfVn_68qpU",
        authDomain: "recipe-book-angular-44b2c.firebaseapp.com",
        databaseURL: "https://recipe-book-angular-44b2c.firebaseio.com",
        projectId: "recipe-book-angular-44b2c",
        storageBucket: "recipe-book-angular-44b2c.appspot.com",
        messagingSenderId: "688209381830",
        appId: "1:688209381830:web:786fa5e7d0b7696743cac7",
        measurementId: "G-KRQ9HTDZEH",
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
