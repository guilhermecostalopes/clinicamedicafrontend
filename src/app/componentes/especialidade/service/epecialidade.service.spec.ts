import { TestBed } from "@angular/core/testing";

import { EpecialidadeService } from "./epecialidade.service";

describe("EpecialidadeService", () => {
  let service: EpecialidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpecialidadeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
