import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinAddComponent } from './medicin-add.component';

describe('MedicinAddComponent', () => {
  let component: MedicinAddComponent;
  let fixture: ComponentFixture<MedicinAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicinAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
