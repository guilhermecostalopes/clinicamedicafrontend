import { TestBed } from "@angular/core/testing";

import { PlanoSaudeService } from "./plano-saude.service";

describe("PlanoSaudeService", () => {
  let service: PlanoSaudeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoSaudeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
