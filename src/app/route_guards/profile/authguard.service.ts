import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/userservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService, public router: Router) {}

  canActivate(): boolean {
    this.userService.isUserLoged().subscribe((res) => {
      if (res.ok === false) {
        this.router.navigate(['/login']);
      }
    });
    return true;
  }
}
