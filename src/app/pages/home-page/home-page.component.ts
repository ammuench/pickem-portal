import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { PoolService } from "@services/pool/pool.service";
import { PickemPool } from "@services/pool/pool.types";
import { selectActiveUser, selectUserFullName } from "@userstate/user.selectors";
import {
  map,
  Observable,
  of,
} from "rxjs";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  public userInfo$: Observable<string | null> = of(null);
  public userPools$: Observable<PickemPool[]> = of([]);

  constructor(
    private _store: Store,
    private _poolService: PoolService
  ) { }

  public ngOnInit(): void {
    this.userInfo$ = this._store.select(selectActiveUser).pipe(map((userObj) => {
      if (userObj) {
        return JSON.stringify(userObj);
      }
      return null;
    }));
    this.userPools$ = this._poolService.getUserPools();
    this.userPools$.subscribe(
      (pools) => {
        console.log({
          type: "USERPOOLS",
          pools,
        });
      }
    );
  }

  public get fullName$(): Observable<string> {
    return this._store.select(selectUserFullName);
  }
}
