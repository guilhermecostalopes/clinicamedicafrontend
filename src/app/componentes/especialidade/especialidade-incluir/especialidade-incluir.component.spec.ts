import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadeIncluirComponent } from './especialidade-incluir.component';

describe('EspecialidadeIncluirComponent', () => {
  let component: EspecialidadeIncluirComponent;
  let fixture: ComponentFixture<EspecialidadeIncluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecialidadeIncluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialidadeIncluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
