import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAutosComponent } from './modal-autos.component';

describe('ModalAutosComponent', () => {
  let component: ModalAutosComponent;
  let fixture: ComponentFixture<ModalAutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
