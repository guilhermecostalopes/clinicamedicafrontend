import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeAlterarComponent } from './especialidade-alterar.component';

describe('EspecialidadeAlterarComponent', () => {
  let component: EspecialidadeAlterarComponent;
  let fixture: ComponentFixture<EspecialidadeAlterarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadeAlterarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadeAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
