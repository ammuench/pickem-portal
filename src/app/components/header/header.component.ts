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
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public userIsLoggedIn$: Observable<boolean> = of(false);

  public authMenuItems = [
    {
      label: "Pools",
      items: [
        {
          label: "Create Pick-Em",
          icon: "pi pi-plus",
          command: () => {
            this.navigateToCreatePool();
          },
        },
        {
          label: "Manage Pick-Ems",
          icon: "pi pi-server",
          command: () => {
            this.navigateToManagePools();
          },
        },
        {
          label: "Find Pick-Em",
          icon: "pi pi-search",
          command: () => {
            this.navigateToPoolSearch();
          },
        },
      ],
    },
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

  constructor(private _store: Store, private _router: Router) { }

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

  public navigateToCreatePool(): void {
    this._router.navigate(["/createPool"]);
  }

  public navigateToManagePools(): void { }

  public navigateToPoolSearch(): void { }

  public logOut(): void {
    this._store.dispatch(logoutUser());
  }
}
