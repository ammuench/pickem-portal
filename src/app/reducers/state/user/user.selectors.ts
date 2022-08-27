import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUser = createFeatureSelector<UserState>("user");

export const selectLoginState = createSelector(
  selectUser,
  (userState) => {
    if (userState.user) {
      return true;
    }

    return false;
  }
);