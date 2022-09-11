import { Component, Input } from "@angular/core";
import { PickemPool } from "@services/pool/pool.types";

@Component({
  selector: "app-pool-card",
  templateUrl: "./pool-card.component.html",
  styleUrls: ["./pool-card.component.scss"],
})
export class PoolCardComponent {
  @Input() public userPool: PickemPool | null = null;
}
