import { createAction, props } from "@ngrx/store";

export const setUserData = createAction(
  "[User] Set User Data",
  props<{ userData: any }>()
);
