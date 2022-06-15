import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupaDialogComponent } from './grupa-dialog.component';

describe('GrupaDialogComponent', () => {
  let component: GrupaDialogComponent;
  let fixture: ComponentFixture<GrupaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
