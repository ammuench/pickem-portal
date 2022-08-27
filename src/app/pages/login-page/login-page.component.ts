import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthService } from "@services/auth/auth.service";
import { LoginCredentials } from "@services/auth/auth.types";
import { clearUserData, loginUser } from "@userstate/user.actions";
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
    private _authService: AuthService
  ) { }

  public ngOnInit(): void {
    this._store.dispatch(clearUserData());
  }

  public get hasFormError(): Observable<boolean> {
    if (this.formError) {
      return of(true);
    }

    return this.loginError$.pipe(
      map((loginError) => !!loginError || false)
    );
  }

  public submitLogin(): void {
    this.loginForm.markAsTouched();
    this.formError = null;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email && password) {
        const registrationCredentials: LoginCredentials = {
          email,
          password,
        };
        this._store.dispatch(loginUser(registrationCredentials));
      }
    } else {
      this.formError = "Please Complete All Required Fields";
    }
  }
}
