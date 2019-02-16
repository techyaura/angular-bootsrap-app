import { TestBed, inject } from '@angular/core/testing';

import { CustomtoastrService } from './customtoastr.service';

describe('CustomtoastrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomtoastrService]
    });
  });

  it('should be created', inject([CustomtoastrService], (service: CustomtoastrService) => {
    expect(service).toBeTruthy();
  }));
});
