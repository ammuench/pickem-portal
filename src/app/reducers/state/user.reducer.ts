
import { createReducer, on } from "@ngrx/store";
import { setUserData } from "./user.actions";

export interface UserState {
  user: any | null;
}

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUserData, (state, { userData }): UserState => ({
    ...state,
    user: userData,
  }))
);