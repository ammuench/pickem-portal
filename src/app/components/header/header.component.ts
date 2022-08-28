import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  map,
  Observable,
  of,
} from "rxjs";
import {
  selectActiveUser,
  selectLoginState,
  selectUsername,
} from "@userstate/user.selectors";
import { logoutUser } from "@userstate/user.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public userIsLoggedIn$: Observable<boolean> = of(false);

  public authMenuItems = [
    {
      label: "Options",
      items: [
        {
          label: "Log Out",
          icon: "pi pi-times-circle",
          command: () => {
            this.logOut();
          },
        },
      ],
    },
  ];

  constructor(private _store: Store) {

  }

  public ngOnInit(): void {
    this.userIsLoggedIn$ = this._store.select(selectLoginState);
  }

  public get userName$(): Observable<string> {
    return this._store.select(selectUsername);
  }

  public get avatarLetter$(): Observable<string> {
    return this._store.select(selectActiveUser).pipe(
      map((userProfile) => {
        if (userProfile) {
          return Array.from(userProfile.userName)[0].toUpperCase();
        }

        return "";
      })
    );
  }

  public logOut(): void {
    this._store.dispatch(logoutUser());
  }
}
