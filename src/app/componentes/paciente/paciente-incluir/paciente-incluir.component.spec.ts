import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteIncluirComponent } from './paciente-incluir.component';

describe('PacienteIncluirComponent', () => {
  let component: PacienteIncluirComponent;
  let fixture: ComponentFixture<PacienteIncluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteIncluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteIncluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
