import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { selectLoginState } from "@userstate/user.selectors";


@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private _store: Store, private _router: Router) { }

  public canActivate(): Observable<boolean> {

    return this._store.select(selectLoginState).pipe(
      map((userIsLoggedIn) => {
        if (userIsLoggedIn) {
          return true;
        }

        this._router.navigate(["/login"]);
        return false;
      })
    );
  }

}
