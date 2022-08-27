import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  Actions,
  createEffect,
  ofType,
} from "@ngrx/effects";
import { AuthService } from "@services/auth/auth.service";
import {
  catchError,
  from,
  map,
  mergeMap,
  of,
} from "rxjs";
import { LocalStorageKeys } from "@enums/localStorageKeys.enum";
import {
  clearUserData,
  loginUser,
  loginUserError,
  logoutUser,
  setUserData,
  signupUser,
  signupUserError,
} from "./user.actions";

@Injectable()
export class UserEffects {

  public signUpUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupUser),
      mergeMap((loginCredentials) => {
        return from(this._authService.registerUser(loginCredentials)).pipe(
          map((res) => {
            return setUserData({
              userData: res,
            });
          }),
          catchError(() => {
            return of(signupUserError({
              error: "There was an error creating an account, please try again",
            }));
          })
        );
      })
    )
  );

  public loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap((loginCredentials) => {
        return from(this._authService.loginUser(loginCredentials)).pipe(
          map((res) => {
            return setUserData({
              userData: res,
            });
          }),
          catchError(() => {
            return of(loginUserError({
              error: "There was an error logging in, please try again",
            }));
          })
        );
      })
    )
  );

  public setUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUserData),
      map((userData) => {
        localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(userData));
        return {
          type: "NOOP_ACTION",
        };
      })

    )
  );

  public logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUser),
      mergeMap(() => {
        return from(this._authService.logoutUser()).pipe(
          map(() => {
            this._router.navigate(["/login"]);
            return clearUserData();
          }),
          catchError(() => {
            this._router.navigate(["/login"]);
            return of(clearUserData());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private _authService: AuthService,
    private _router: Router
  ) { }
}