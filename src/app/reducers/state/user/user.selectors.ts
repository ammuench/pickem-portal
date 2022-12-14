import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>("user");

export const selectLoginState = createSelector(
  selectUserState,
  (userState) => {
    if (userState.user) {
      return true;
    }

    return false;
  }
);

export const selectActiveUser = createSelector(
  selectUserState,
  ({ user }) => user
);

export const selectUsername = createSelector(
  selectUserState,
  ({ user }) => {
    if (user) {
      return user.userName;
    }

    return "";
  }
);

export const selectUserFullName = createSelector(
  selectUserState,
  ({ user }) => {
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }

    return "";
  }
);

export const selectLoginPendingStatus = createSelector(
  selectUserState,
  ({ pendingLoginAction }) => pendingLoginAction
);

export const selectLoginError = createSelector(
  selectUserState,
  ({ loginError }) => loginError
);

export const selectUID = createSelector(
  selectActiveUser,
  (user) => {
    if (user) {
      return user.uid;
    }
    return null;
  }
);