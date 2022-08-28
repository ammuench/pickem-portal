
import { UserCredential } from "@angular/fire/auth";
import { createReducer, on } from "@ngrx/store";
import {
  clearUserData,
  loginRegisterUserSuccess,
  loginUserError,
  setUserData,
  signupUserError,
} from "./user.actions";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
};

export interface UserState {
  user: UserCredential | null;
  pendingLoginAction: boolean;
  loginError: string | null;
}

export const initialState: UserState = {
  user: null,
  loginError: null,
  pendingLoginAction: false,
};

export const userReducer = createReducer(
  initialState,
  on(signupUserError, (state, { error }): UserState => ({
    ...state,
    loginError: error,
    pendingLoginAction: false,
  })),

  on(loginUserError, (state, { error }): UserState => ({
    ...state,
    loginError: error,
    pendingLoginAction: false,
  })),
  on(loginRegisterUserSuccess, (state, { userData }): UserState => ({
    ...state,
    user: userData,
    loginError: null,
    pendingLoginAction: false,
  })),
  on(setUserData, (state, { userData }): UserState => ({
    ...state,
    user: userData,
    loginError: null,
    pendingLoginAction: false,
  })),
  on(clearUserData, (): UserState => initialState)
);