import { User, UserCredential } from "@angular/fire/auth";
import { createAction, props } from "@ngrx/store";
import { LoginCredentials } from "@services/auth/auth.types";

export const loginUser = createAction(
  "[User] Login User",
  props<LoginCredentials>()
);

export const loginUserError = createAction(
  "[User] Login User Error",
  props<{ error: string }>()
);

export const logoutUser = createAction(
  "[User] Logout User"
);

export const signupUser = createAction(
  "[User] SignUp User",
  props<LoginCredentials>()
);

export const signupUserError = createAction(
  "[User] SignUp User Error",
  props<{ error: string }>()
);

export const restoreUserSession = createAction(
  "[User] Restore User Sesssion",
  props<{ userData: User }>()
);

export const setUserData = createAction(
  "[User] Set User Data",
  props<{ userData: UserCredential }>()
);


export const clearUserData = createAction(
  "[User] Clear User Data"
);
