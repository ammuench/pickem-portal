import { Injectable } from "@angular/core";
import { Auth, onAuthStateChanged } from "@angular/fire/auth";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService } from "@services/auth/auth.service";
import { setUserData } from "@userstate/user.actions";
import { selectActiveUser } from "@userstate/user.selectors";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HasuserdataGuard implements CanActivate {
  constructor(
    private _store: Store,
    private _authService: AuthService,
    private _router: Router,
    private _auth: Auth
  ) { }
  public async canActivate(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const activeUser = await firstValueFrom(this._store.select(selectActiveUser));

      if (activeUser) { resolve(true); };


      onAuthStateChanged(this._auth, async (user) => {
        if (user && user.uid) {
          const safeUid = JSON.parse(JSON.stringify(user.uid));
          const userProfile = await this._authService.getUserProfile(safeUid);
          console.log({
            type: "AUTH GUARD STUFF",
            user,
            safeUid,
            userProfile,
          });

          if (userProfile) {
            this._store.dispatch(setUserData({
              userData: userProfile,
            }));
            setTimeout(() => {
              resolve(true);
            }, 25);
          } else {
            this._router.navigate(["/login"]);
            reject(false);
          }
        }
      });
    });
  }

}
