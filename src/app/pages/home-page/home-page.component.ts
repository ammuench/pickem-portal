import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
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

  constructor(private _store: Store) { }

  public ngOnInit(): void {
    this.userInfo$ = this._store.select(selectActiveUser).pipe(map((userObj) => {
      if (userObj) {
        return JSON.stringify(userObj);
      }
      return null;
    }));
  }

  public get fullName$(): Observable<string> {
    return this._store.select(selectUserFullName);
  }
}
