import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPesquisarComponent } from './usuario-pesquisar.component';

describe('UsuarioPesquisarComponent', () => {
  let component: UsuarioPesquisarComponent;
  let fixture: ComponentFixture<UsuarioPesquisarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPesquisarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPesquisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
