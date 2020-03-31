import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoUsarioComponent } from './novo-usario.component';

describe('NovoUsarioComponent', () => {
  let component: NovoUsarioComponent;
  let fixture: ComponentFixture<NovoUsarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoUsarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoUsarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
