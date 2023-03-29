import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShceduleListComponent } from './shcedule-list.component';

describe('ShceduleListComponent', () => {
  let component: ShceduleListComponent;
  let fixture: ComponentFixture<ShceduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShceduleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShceduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
