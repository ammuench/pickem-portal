import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { selectLoginState } from "@userstate/user.selectors";
import { logoutUser } from "@userstate/user.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public userIsLoggedIn$: Observable<boolean> = of(false);

  constructor(private _store: Store) {

  }

  public ngOnInit(): void {
    this.userIsLoggedIn$ = this._store.select(selectLoginState);
  }

  public logOut(): void {
    this._store.dispatch(logoutUser());
  }
}
