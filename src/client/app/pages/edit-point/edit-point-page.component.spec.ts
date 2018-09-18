import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditPointPageComponent } from "./edit-point-page.component";

describe("CreatePointComponent", () => {
  let component: EditPointPageComponent;
  let fixture: ComponentFixture<EditPointPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPointPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPointPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
