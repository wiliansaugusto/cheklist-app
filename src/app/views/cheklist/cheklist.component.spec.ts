import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheklistComponent } from './cheklist.component';

describe('CheklistComponent', () => {
  let component: CheklistComponent;
  let fixture: ComponentFixture<CheklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
