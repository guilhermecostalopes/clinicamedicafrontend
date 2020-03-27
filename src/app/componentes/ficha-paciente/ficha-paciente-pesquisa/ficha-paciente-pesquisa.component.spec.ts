import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FichaPacientePesquisaComponent } from "./ficha-paciente-pesquisa.component";

describe("FichaPacientePesquisaComponent", () => {
  let component: FichaPacientePesquisaComponent;
  let fixture: ComponentFixture<FichaPacientePesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FichaPacientePesquisaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaPacientePesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
