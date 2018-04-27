import { TestBed, inject } from '@angular/core/testing';

import { ColorScaleService } from './color-scale.service';

describe('ColorScaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorScaleService]
    });
  });

  it('should be created', inject([ColorScaleService], (service: ColorScaleService) => {
    expect(service).toBeTruthy();
  }));
});
