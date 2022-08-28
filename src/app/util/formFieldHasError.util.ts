import { FormGroup } from "@angular/forms";

export const formFieldHasError = (formToCheck: FormGroup, formKey: string): boolean => {
  const controlToCheck = formToCheck.get(formKey);
  if (controlToCheck) {
    return controlToCheck.touched && controlToCheck.invalid;
  }

  return false;
};