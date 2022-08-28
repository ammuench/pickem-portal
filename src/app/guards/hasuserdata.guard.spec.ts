import { TestBed } from "@angular/core/testing";

import { HasuserdataGuard } from "./hasuserdata.guard";

describe("HasuserdataGuard", () => {
  let guard: HasuserdataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    guard = TestBed.inject(HasuserdataGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
