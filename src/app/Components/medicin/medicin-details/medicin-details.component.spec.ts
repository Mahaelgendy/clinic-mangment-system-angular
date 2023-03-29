import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinDetailsComponent } from './medicin-details.component';

describe('MedicinDetailsComponent', () => {
  let component: MedicinDetailsComponent;
  let fixture: ComponentFixture<MedicinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
