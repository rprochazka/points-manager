import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePointPageComponent } from './create-point-page.component';

describe('CreatePointComponent', () => {
  let component: CreatePointPageComponent;
  let fixture: ComponentFixture<CreatePointPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePointPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePointPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
