import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsoApi } from './uso-api';

describe('UsoApi', () => {
  let component: UsoApi;
  let fixture: ComponentFixture<UsoApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsoApi],
    }).compileComponents();

    fixture = TestBed.createComponent(UsoApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
