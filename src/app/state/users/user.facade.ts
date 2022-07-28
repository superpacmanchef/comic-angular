import { Injectable } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { getCollection, getPullList, getUser } from '..';
import * as UserActions from './user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(private store$: Store<any>, private actions$: ActionsSubject) {}

  user$ = this.store$.select(getUser);
  collection$ = this.store$.select(getCollection);
  pullList$ = this.store$.select(getPullList);

  mutations$ = this.actions$.pipe(
    filter(
      (action) =>
        action.type === UserActions.UserActionTypes.UserLoadSuccess ||
        action.type === UserActions.UserActionTypes.PullAddSuccess
    )
  );

  loadUser() {
    this.store$.dispatch(UserActions.loadUserAction());
  }

  addPullList(comic: string) {
    this.store$.dispatch(UserActions.addPullAction({ comic }));
  }
  removePullList(comic: string) {
    this.store$.dispatch(UserActions.removePullAction({ comic }));
  }

  addCollection(comic: Comic_ShortBoxed_SplitTitle_Image) {
    this.store$.dispatch(UserActions.addCollectionAction({ comic }));
  }
  removeCollection(comic: Comic_ShortBoxed_SplitTitle_Image) {
    this.store$.dispatch(UserActions.removeCollectionAction({ comic }));
  }
}
