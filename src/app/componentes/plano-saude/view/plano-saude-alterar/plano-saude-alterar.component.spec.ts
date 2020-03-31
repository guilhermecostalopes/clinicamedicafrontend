import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlanoSaudeAlterarComponent } from "./plano-saude-alterar.component";

describe("PlanoSaudeAlterarComponent", () => {
  let component: PlanoSaudeAlterarComponent;
  let fixture: ComponentFixture<PlanoSaudeAlterarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanoSaudeAlterarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoSaudeAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
