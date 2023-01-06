import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import * as AuthActions from './auth.actions';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  auth = getAuth();
  currentUser = this.auth.currentUser;

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNUP),
    map((action: AuthActions.TrySignup) => {
      return action.payload;
    }),
    switchMap((authData: { username: string; password: string }) => {
      return from(
        createUserWithEmailAndPassword(
          this.auth,
          authData.username,
          authData.password
        )
      );
    }),
    switchMap(() => {
      return from(this.currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNUP,
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token,
        },
      ];
    })
  );

  @Effect()
  authSignin = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNIN),
    map((action: AuthActions.TrySignin) => {
      return action.payload;
    }),
    switchMap((authData: { username: string; password: string }) => {
      return from(
        signInWithEmailAndPassword(
          this.auth,
          authData.username,
          authData.password
        )
      );
    }),
    switchMap(() => {
      return from(this.currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN,
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token,
        },
      ];
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(private actions$: Actions, private router: Router) {}
}
