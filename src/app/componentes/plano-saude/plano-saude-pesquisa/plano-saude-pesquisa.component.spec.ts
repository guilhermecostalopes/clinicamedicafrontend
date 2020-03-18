import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoSaudePesquisaComponent } from './plano-saude-pesquisa.component';

describe('PlanoSaudePesquisaComponent', () => {
  let component: PlanoSaudePesquisaComponent;
  let fixture: ComponentFixture<PlanoSaudePesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoSaudePesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoSaudePesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
