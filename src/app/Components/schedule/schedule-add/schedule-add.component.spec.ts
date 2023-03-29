import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAddComponent } from './schedule-add.component';

describe('ScheduleAddComponent', () => {
  let component: ScheduleAddComponent;
  let fixture: ComponentFixture<ScheduleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
