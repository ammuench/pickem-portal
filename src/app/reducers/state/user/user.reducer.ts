
import { createReducer, on } from "@ngrx/store";
import { clearUserData, setUserData } from "./user.actions";

export type User = any;

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUserData, (state, { userData }): UserState => ({
    ...state,
    user: userData,
  })),
  on(clearUserData, (): UserState => initialState)
);