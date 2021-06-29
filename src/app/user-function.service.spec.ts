import { TestBed } from '@angular/core/testing';

import { UserFunctionService } from './user-function.service';

describe('UserFunctionService', () => {
  let service: UserFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
