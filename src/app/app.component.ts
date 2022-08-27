import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private _activatedRouteSnap: ActivatedRoute) { }

  public ngOnInit(): void {
    console.log(this._activatedRouteSnap.snapshot);
  }
}
