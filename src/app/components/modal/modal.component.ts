import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/userservice.service';
import { UserFacade } from 'src/app/state/users/user.facade';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public comic: Comic_ShortBoxed_SplitTitle_Image,
    private userService: UserService,
    private userFacade: UserFacade
  ) {}

  collection$ = this.userFacade.collection$;
  pullList$ = this.userFacade.pullList$;

  inCollection!: boolean;
  inPullList!: boolean;

  get loged() {
    return this.userService.isLoged;
  }

  checkInPullList(pullList: string[]) {
    const t = pullList.filter(
      (c) => c.toLowerCase() === this.comic.title.toLowerCase()
    );

    if (t.length > 0) {
      this.inPullList = true;
    } else {
      this.inPullList = false;
    }
  }
  checkInCollection(collection: Comic_ShortBoxed_SplitTitle_Image[]) {
    const t = collection.filter((c) => c.diamond_id === this.comic.diamond_id);

    if (t.length > 0) {
      this.inCollection = true;
    } else {
      this.inCollection = false;
    }
  }

  addToPullList() {
    this.userFacade.addPullList(this.comic.title);
  }
  removeFromPullList() {
    this.userFacade.removePullList(this.comic.title);
  }

  addToCollection() {
    this.userFacade.addCollection(this.comic);
  }
  removeFromCollection() {
    this.userFacade.removeCollection(this.comic);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.collection$.subscribe((collection) => {
      this.checkInCollection(collection);
    });

    this.pullList$.subscribe((pullList) => {
      this.checkInPullList(pullList);
    });
  }
}
