import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CreatePoolPageComponent } from "./create-pool-page.component";

describe("CreatePoolPageComponent", () => {
  let component: CreatePoolPageComponent;
  let fixture: ComponentFixture<CreatePoolPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePoolPageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreatePoolPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
