import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { from } from "rxjs";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
} from "@angular/fire/auth";

import * as AuthActions from "./auth.actions";
import { map, switchMap, mergeMap, tap } from "rxjs/operators";

@Injectable()
export class AuthEffects {
  currentUser = user(this.auth);

  authSignup = createEffect(() =>
    this.actions$.pipe(
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
        return from(this.currentUser);
      }),
      switchMap((user) => user.getIdToken()),
      mergeMap((token: string) => {
        this.router.navigate(["/"]);
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
    )
  );

  authSignin = createEffect(() =>
    this.actions$.pipe(
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
        return from(this.currentUser);
      }),
      switchMap((user) => {
        return user.getIdToken();
      }),
      mergeMap((token: string) => {
        this.router.navigate(["/"]);
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
    )
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.router.navigate(["/"]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private auth: Auth,
    private router: Router
  ) {}
}
