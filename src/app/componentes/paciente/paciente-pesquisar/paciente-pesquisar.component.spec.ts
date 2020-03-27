import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientePesquisarComponent } from './paciente-pesquisar.component';

describe('PacientePesquisarComponent', () => {
  let component: PacientePesquisarComponent;
  let fixture: ComponentFixture<PacientePesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientePesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientePesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
