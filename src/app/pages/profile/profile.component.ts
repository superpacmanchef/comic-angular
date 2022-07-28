import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RESTAPIService } from 'src/app/services/restapiservice.service';
import { UserService } from 'src/app/services/userservice.service';
import { UserFacade } from 'src/app/state/users/user.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userFacade: UserFacade
  ) {
    this.userFacade.loadUser();
  }

  showCollection!: boolean;
  showPullList!: boolean;

  addForm!: FormGroup;

  pullList$ = this.userFacade.pullList$;
  collection$ = this.userFacade.collection$;

  showCollectionClick() {
    this.showCollection = true;
    this.showPullList = false;
  }

  showPullListClick() {
    this.showCollection = false;
    this.showPullList = true;
  }

  get user() {
    return this.userService.user;
  }

  deletePullList(comicName: string) {
    this.userFacade.removePullList(comicName);
  }

  addPullList() {
    this.userFacade.addPullList(this.addForm.value.addInput);
  }

  ngOnInit(): void {
    this.showCollection = true;
    this.showPullList = false;

    this.addForm = new FormGroup({
      addInput: new FormControl('', [Validators.required]),
    });
  }
}
