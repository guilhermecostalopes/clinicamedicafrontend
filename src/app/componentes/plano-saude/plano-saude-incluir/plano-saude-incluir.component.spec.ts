import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoSaudeIncluirComponent } from './plano-saude-incluir.component';

describe('PlanoSaudeIncluirComponent', () => {
  let component: PlanoSaudeIncluirComponent;
  let fixture: ComponentFixture<PlanoSaudeIncluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoSaudeIncluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoSaudeIncluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
