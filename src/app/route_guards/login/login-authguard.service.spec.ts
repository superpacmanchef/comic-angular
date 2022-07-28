import { TestBed } from '@angular/core/testing';
import { LoginAuthGuardService } from './login-authguard.service';

describe('AuthGuardService', () => {
  let service: LoginAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
