import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { firstValueFrom } from "rxjs";
import { CreatePoolObject } from "./pool.types";

@Injectable({
  providedIn: "root",
})
export class PoolService {
  constructor(
    private _http: HttpClient,
    private _auth: Auth
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
}
