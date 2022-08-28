import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService } from "@services/auth/auth.service";
import { LoginCredentials } from "@services/auth/auth.types";
import {
  clearUserData,
  loginRegisterUserSuccess,
  loginUserError,
} from "@userstate/user.actions";
import { selectLoginError } from "@userstate/user.selectors";
import {
  map,
  Observable,
  of,
} from "rxjs";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  public formError: string | null = null;
  public loginError$: Observable<string | null> = of(null);
  public loginForm = this._fb.group({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private _store: Store,
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { }

  public ngOnInit(): void {
    this.loginError$ = this._store.select(selectLoginError);
    this._store.dispatch(clearUserData());
  }

  public get hasFormError(): Observable<boolean> {
    if (this.formError) {
      return of(true);
    }

    return this.loginError$.pipe(
      map((loginError) => (loginError === null) ? false : true)
    );
  }

  public async submitLogin(): Promise<void> {
    this.loginForm.markAsTouched();
    this.formError = null;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email && password) {
        const loginCreds: LoginCredentials = {
          email,
          password,
        };
        try {
          const userLoggedInDetails = await this._authService.loginUser(loginCreds);
          this._store.dispatch(loginRegisterUserSuccess({
            userData: userLoggedInDetails,
          }));
        } catch (e) {
          console.error(e);
          this._store.dispatch(loginUserError({
            error: "Error logging in, please try again",
          }));
        }
      } else {
        this.formError = "Please Complete All Required Fields";
      }
    }
  }
}
