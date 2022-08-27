import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthService } from "@services/auth/auth.service";
import { clearUserData } from "@userstate/user.actions";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {

  constructor(
    private _store: Store,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { }

  public ngOnInit(): void {
    this._store.dispatch(clearUserData());
  }
}
