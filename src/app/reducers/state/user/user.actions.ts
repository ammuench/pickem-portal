import { createAction, props } from "@ngrx/store";
import { User } from "./user.reducer";

export const loginUserError = createAction(
  "[User] Login User Error",
  props<{ error: string }>()
);

export const logoutUser = createAction(
  "[User] Logout User"
);

export const signupUserError = createAction(
  "[User] SignUp User Error",
  props<{ error: string }>()
);

export const restoreUserSession = createAction(
  "[User] Restore User Sesssion",
  props<{ userData: any }>()
);

export const loginRegisterUserSuccess = createAction(
  "[User] Login/Register User Success",
  props<{ userData: User }>()
);


export const setUserData = createAction(
  "[User] Set User Data",
  props<{ userData: User }>()
);


export const clearUserData = createAction(
  "[User] Clear User Data"
);
