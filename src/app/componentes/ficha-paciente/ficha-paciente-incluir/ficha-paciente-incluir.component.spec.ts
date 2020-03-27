import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FichaPacienteIncluirComponent } from "./ficha-paciente-incluir.component";

describe("FichaPacienteIncluirComponent", () => {
  let component: FichaPacienteIncluirComponent;
  let fixture: ComponentFixture<FichaPacienteIncluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FichaPacienteIncluirComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaPacienteIncluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
