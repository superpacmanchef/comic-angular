import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/userservice.service';
import * as userActions from './user.actions';

@Injectable()
export class UserStoreEffects {
  constructor(private userService: UserService, private actions$: Actions) {}

  loadUserRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.loadUserAction),
      switchMap((action) => {
        return this.userService.isUserLoged().pipe(
          map((user: any) => {
            return userActions.userLoadSuccess({ user });
          }),
          catchError((error: any) => {
            console.log(error);
            return of(userActions.userLoadFailure({ error }));
          })
        );
      })
    );
  });

  addPullRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.addPullAction),
      switchMap((action) => {
        return this.userService.addPullList(action.comic).pipe(
          map((pullList: string[]) => {
            console.log(pullList);

            return userActions.pullAddSuccess({ pullList });
          }),
          catchError((error: any) => {
            console.log(error);
            return of(userActions.pullAddFailure({ error }));
          })
        );
      })
    );
  });

  removePullRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.removePullAction),
      switchMap((action) => {
        return this.userService.deletePullList(action.comic).pipe(
          map((pullList: string[]) => {
            return userActions.pullRemoveSuccess({ pullList });
          }),
          catchError((error: any) => {
            console.log(error);
            return of(userActions.pullRemoveFailure({ error }));
          })
        );
      })
    );
  });

  addCollectionRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.addCollectionAction),
      switchMap((action) => {
        return this.userService.addCollection(action.comic).pipe(
          map((collection: Comic_ShortBoxed_SplitTitle_Image[]) => {
            return userActions.collectionAddSuccess({ collection });
          }),
          catchError((error: any) => {
            console.log(error);
            return of(userActions.collectionAddFailure({ error }));
          })
        );
      })
    );
  });

  removeCollectionRequestEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.removeCollectionAction),
      switchMap((action) => {
        return this.userService.deleteCollection(action.comic.diamond_id).pipe(
          map((collection: Comic_ShortBoxed_SplitTitle_Image[]) => {
            console.log(collection);

            return userActions.collectionRemoveSuccess({ collection });
          }),
          catchError((error: any) => {
            console.log(error);
            return of(userActions.collectionRemoveFailure({ error }));
          })
        );
      })
    );
  });
}
