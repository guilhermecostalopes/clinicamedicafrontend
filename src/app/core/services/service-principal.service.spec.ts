import { TestBed } from '@angular/core/testing';

import { ServicePrincipalService } from './service-principal.service';

describe('ServicePrincipalService', () => {
  let service: ServicePrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePrincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
