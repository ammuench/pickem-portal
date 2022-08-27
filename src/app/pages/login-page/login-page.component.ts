import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { clearUserData } from "@userstate/user.actions";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {

  constructor(private _store: Store) { }

  public ngOnInit(): void {
    this._store.dispatch(clearUserData());
  }
}
