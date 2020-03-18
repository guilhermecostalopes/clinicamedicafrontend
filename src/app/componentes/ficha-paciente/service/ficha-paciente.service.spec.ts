import { TestBed } from '@angular/core/testing';

import { FichaPacienteService } from './ficha-paciente.service';

describe('FichaPacienteService', () => {
  let service: FichaPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichaPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
