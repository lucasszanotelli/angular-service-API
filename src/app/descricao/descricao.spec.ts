import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Descricao } from './descricao';

describe('Descricao', () => {
  let component: Descricao;
  let fixture: ComponentFixture<Descricao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Descricao],
    }).compileComponents();

    fixture = TestBed.createComponent(Descricao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
