import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsPageComponent } from './points-page.component';

describe('PointsComponent', () => {
  let component: PointsPageComponent;
  let fixture: ComponentFixture<PointsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PointsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
