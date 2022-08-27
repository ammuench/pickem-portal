import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { selectLoginState } from "@userstate/user.selectors";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public userIsLoggedIn$: Observable<boolean> = of(false);

  constructor(private _store: Store) {

  }

  public ngOnInit(): void {
    this.userIsLoggedIn$ = this._store.select(selectLoginState);
  }

}
