import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/userservice.service';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthGuardService implements CanActivate {
  constructor(private userService: UserService, public router: Router) {}

  canActivate(): boolean {
    this.userService.isUserLoged().subscribe((res) => {
      if (res.ok === true) {
        this.router.navigate(['/']);
      }
    });
    return true;
  }
}
