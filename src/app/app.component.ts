import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from './services/userservice.service';
import { UserFacade } from './state/users/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private userFacade: UserFacade) {}

  title = 'comic-angular';
  loged!: boolean;

  ngOnInit(): void {
    this.userFacade.user$.subscribe((user) => {
      this.loged = user.email !== '' ? true : false;
    });
  }
}
