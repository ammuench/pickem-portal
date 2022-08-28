import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { PoolService } from "@services/pool/pool.service";
import { CreatePoolObject } from "@services/pool/pool.types";
import { User } from "@userstate/user.reducer";
import { selectActiveUser } from "@userstate/user.selectors";
import { Observable } from "rxjs";
import { formFieldHasError } from "src/app/util/formFieldHasError.util";

@Component({
  selector: "app-create-pool-page",
  templateUrl: "./create-pool-page.component.html",
  styleUrls: ["./create-pool-page.component.scss"],
})
export class CreatePoolPageComponent implements OnInit {
  public isSubmitting = false;
  public formError: string | null = null;
  public createPoolForm = this._formBuilder.group({
    poolTitle: new FormControl("", [Validators.required]),
    poolDescription: new FormControl(""),
    poolStartDate: new FormControl("", [Validators.required]),
    poolEndDate: new FormControl("", [Validators.required]),
    poolIsPublic: new FormControl(false, [Validators.required]),
    poolGameType: new FormControl("CFB", [Validators.required]),
  }, {
    validator: this._endDateIsAfterStart(),
  });
  public publicPrivateOptions = [
    {
      name: "Private",
      bool: false,
    },
    {
      name: "Public",
      bool: true,
    },

  ];
  public gameTypeOptions = [
    {
      name: "CFB",
    },
    {
      name: "NFL",
    },

  ];

  private _currentUser$!: Observable<User | null>;

  constructor(
    private _store: Store,
    private _formBuilder: FormBuilder,
    private _poolService: PoolService
  ) { }

  public ngOnInit(): void {
    this._currentUser$ = this._store.select(selectActiveUser);
  }

  public applyFormErrorClass(formKey: string): boolean {
    return formFieldHasError(this.createPoolForm, formKey);
  }

  public async submitPool(createPoolForm: FormGroup): Promise<void> {
    createPoolForm.markAllAsTouched();
    this.isSubmitting = true;
    this.formError = null;
    if (createPoolForm.valid) {
      try {
        const payload: CreatePoolObject = {
          ...createPoolForm.value,
        };
        await this._poolService.createNewPool(payload);
        window.alert("success");
      } catch (e) {
        this.formError = "An error occurred while submitting your form";
        this.isSubmitting = false;
      }
    } else {
      this.formError = "Please Complete All Required Fields";
      this.isSubmitting = false;
    }
  }

  public get endDateIsInvalid(): boolean {
    if (this.createPoolForm.errors?.["invalidEndDate"]) {
      return true;
    }

    return false;
  }

  private _endDateIsAfterStart() {
    return (group: FormGroup): { [key: string]: any } => {
      const startDateValue = group.get("poolStartDate")?.value;
      const endDateValue = group.get("poolEndDate")?.value;

      if (startDateValue && endDateValue) {
        if (startDateValue > endDateValue) {
          return {
            invalidEndDate: true,
          };
        }
      }
      return {
      };
    };
  }

}
