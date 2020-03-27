import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteAlterarComponent } from './paciente-alterar.component';

describe('PacienteAlterarComponent', () => {
  let component: PacienteAlterarComponent;
  let fixture: ComponentFixture<PacienteAlterarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteAlterarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
