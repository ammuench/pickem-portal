import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreatePoolObject } from "./pool.types";

@Injectable({
  providedIn: "root",
})
export class PoolService {
  constructor(
    private _http: HttpClient
  ) { }

  public createNewPool(newPool: CreatePoolObject): Observable<unknown> {
    const apiUrl = "";
    const headers = {
    };
    const payload = {
      ...newPool,
    };
    return this._http.post(
      apiUrl,
      payload,
      headers
    );
  }
}
