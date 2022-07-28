import { Action, createAction, props } from '@ngrx/store';

export enum UserActionTypes {
  LoadUser = '[Projects] Load Data',
  UserLoadSuccess = '[Projects] Data Load Success',
  UserLoadFailure = '[Projects} Data Load Failure',

  AddToPull = '[Projects] Add To Pull',
  PullAddSuccess = '[Projects] Pull Add Success',
  PullAddFailure = '[Projects] Pull Add Failure',

  RemoveFromPull = '[Projects] Remove From Pull',
  PullRemoveSuccess = '[Projects] Pull Remove Success',
  PullRemoveFailure = '[Projects] Pull Remove Failure',

  AddToCollection = '[Projects] Add To Collection',
  CollectionAddSuccess = '[Projects] Collection Add Success',
  CollectionAddFailure = '[Projects] Collection Add Failure',

  RemoveFromCollection = '[Projects] Remove From Collection',
  CollectionRemoveSuccess = '[Projects] Collection Remove Success',
  CollectionRemoveFailure = '[Projects] Collection Remove Failure',
}

export const loadUserAction = createAction(UserActionTypes.LoadUser);
export const userLoadSuccess = createAction(
  UserActionTypes.UserLoadSuccess,
  props<any>()
);
export const userLoadFailure = createAction(
  UserActionTypes.UserLoadFailure,
  props<any>()
);

export const addPullAction = createAction(
  UserActionTypes.AddToPull,
  props<{ comic: string }>()
);
export const pullAddSuccess = createAction(
  UserActionTypes.PullAddSuccess,
  props<{ pullList: string[] }>()
);
export const pullAddFailure = createAction(
  UserActionTypes.PullAddFailure,
  props<{ error: any }>()
);

export const removePullAction = createAction(
  UserActionTypes.RemoveFromPull,
  props<{ comic: string }>()
);
export const pullRemoveSuccess = createAction(
  UserActionTypes.PullRemoveSuccess,
  props<{ pullList: string[] }>()
);
export const pullRemoveFailure = createAction(
  UserActionTypes.PullRemoveFailure,
  props<{ error: any }>()
);

export const addCollectionAction = createAction(
  UserActionTypes.AddToCollection,
  props<{ comic: Comic_ShortBoxed_SplitTitle_Image }>()
);
export const collectionAddSuccess = createAction(
  UserActionTypes.CollectionAddSuccess,
  props<{ collection: Comic_ShortBoxed_SplitTitle_Image[] }>()
);
export const collectionAddFailure = createAction(
  UserActionTypes.CollectionAddFailure,
  props<{ error: any }>()
);

export const removeCollectionAction = createAction(
  UserActionTypes.RemoveFromCollection,
  props<{ comic: Comic_ShortBoxed_SplitTitle_Image }>()
);
export const collectionRemoveSuccess = createAction(
  UserActionTypes.CollectionRemoveSuccess,
  props<{ collection: Comic_ShortBoxed_SplitTitle_Image[] }>()
);
export const collectionRemoveFailure = createAction(
  UserActionTypes.CollectionRemoveFailure,
  props<{ error: any }>()
);
