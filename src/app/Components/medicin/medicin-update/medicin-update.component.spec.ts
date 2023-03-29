import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinUpdateComponent } from './medicin-update.component';

describe('MedicinUpdateComponent', () => {
  let component: MedicinUpdateComponent;
  let fixture: ComponentFixture<MedicinUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
