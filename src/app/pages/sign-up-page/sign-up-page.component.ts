import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthService } from "@services/auth/auth.service";
import { SignupCredentials } from "@services/auth/auth.types";
import {
  clearUserData,
  loginRegisterUserSuccess,
  signupUserError,
} from "@userstate/user.actions";
import { selectLoginError } from "@userstate/user.selectors";
import {
  map,
  Observable,
  of,
} from "rxjs";

@Component({
  selector: "app-sign-up-page",
  templateUrl: "./sign-up-page.component.html",
  styleUrls: ["./sign-up-page.component.scss"],
})
export class SignUpPageComponent implements OnInit {
  public formError: string | null = null;
  public signUpError$: Observable<string | null> = of(null);
  public signupForm = this._fb.group({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    userName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private _store: Store,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.signUpError$ = this._store.select(selectLoginError);
    this._store.dispatch(clearUserData());
  }

  public get hasFormError(): Observable<boolean> {
    if (this.formError) {
      return of(true);
    }

    return this.signUpError$.pipe(
      map((loginError) => !!loginError || false)
    );
  }

  public async submitSignup(): Promise<void> {
    this.signupForm.markAsTouched();
    this.formError = null;
    if (this.signupForm.valid) {
      const { email, password, firstName, lastName, userName } = this.signupForm.value;
      if (email && password && firstName && lastName && userName) {
        const registrationCredentials: SignupCredentials = {
          email,
          password,
          firstName,
          lastName,
          userName,
        };
        try {
          const newUserProfile = await this._authService.registerUser(registrationCredentials);
          this._store.dispatch(loginRegisterUserSuccess({
            userData: newUserProfile,
          }));
        } catch (e) {
          console.error(e);
          this._store.dispatch(signupUserError({
            error: "Error signing up, please try again",
          }));
        }
      }
    } else {
      this.formError = "Please Complete All Required Fields";
    }
  }
}
