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
  tap,
} from "rxjs";
import {
  clearUserData,
  logoutUser,
  loginRegisterUserSuccess,
} from "./user.actions";

@Injectable()
export class UserEffects {
  public loginRegisterUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRegisterUserSuccess),
      map(() => {
        return {
          type: "NOOP ACTION",
        };
      }),
      tap(() => {
        this._router.navigate(["/home"]);
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