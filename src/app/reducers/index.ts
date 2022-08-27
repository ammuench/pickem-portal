import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { UserEffects } from "@userstate/user.effects";
import { environment } from "../../environments/environment";
import { userReducer, UserState } from "./state/user/user.reducer";


export interface RootState {
  user: UserState
}

export const reducers: ActionReducerMap<RootState> = {
  user: userReducer,
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];

export const effects = [UserEffects];