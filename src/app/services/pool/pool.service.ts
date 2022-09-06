import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import {
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  query,
  where,
} from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { selectUID } from "@userstate/user.selectors";
import {
  first,
  firstValueFrom,
  mergeMap,
  Observable,
} from "rxjs";
import { CreatePoolObject, PickemPool } from "./pool.types";

@Injectable({
  providedIn: "root",
})
export class PoolService {
  constructor(
    private _http: HttpClient,
    private _auth: Auth,
    private _store: Store,
    private _firestore: Firestore
  ) { }

  public async createNewPool(newPool: CreatePoolObject): Promise<any> {
    try {
      const userIdToken = await this._auth.currentUser?.getIdToken();
      const apiUrl = "http://local.pickempool:5001/pickem-portal-dev/us-central1/createPool";
      const payload = {
        ...newPool,
        userIdToken,
      };
      return firstValueFrom(
        this._http.post(
          apiUrl,
          payload
        )
      );
    } catch (e) {
      console.error(e);
      return new Error("An error occurred while trying to create a pool");
    }
  };

  public getUserPools(): Observable<PickemPool[]> {
    return this._store.select(selectUID).pipe(
      mergeMap((uid) => {
        const ref = collection(this._firestore, "pickemPools") as CollectionReference<PickemPool>;
        const q = query<PickemPool>(ref, where("poolMemberIds", "array-contains", uid));
        return collectionData(q).pipe(first());
      })
    );
  }
}
