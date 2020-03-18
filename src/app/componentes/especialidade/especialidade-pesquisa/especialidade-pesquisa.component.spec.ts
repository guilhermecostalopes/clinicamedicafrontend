import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadePesquisaComponent } from './especialidade-pesquisa.component';

describe('EspecialidadePesquisaComponent', () => {
  let component: EspecialidadePesquisaComponent;
  let fixture: ComponentFixture<EspecialidadePesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadePesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadePesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
