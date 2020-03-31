import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FichaPacienteAlterarComponent } from "./ficha-paciente-alterar.component";

describe("FichaPacienteAlterarComponent", () => {
  let component: FichaPacienteAlterarComponent;
  let fixture: ComponentFixture<FichaPacienteAlterarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FichaPacienteAlterarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaPacienteAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
