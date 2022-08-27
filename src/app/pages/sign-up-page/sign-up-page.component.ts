import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthService } from "@services/auth/auth.service";
import { clearUserData } from "@userstate/user.actions";

@Component({
  selector: "app-sign-up-page",
  templateUrl: "./sign-up-page.component.html",
  styleUrls: ["./sign-up-page.component.scss"],
})
export class SignUpPageComponent implements OnInit {
  public signupForm = this._fb.group({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private _store: Store,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { }

  public ngOnInit(): void {
    this._store.dispatch(clearUserData());
  }

  public submitSignup(): void {

  }
}
