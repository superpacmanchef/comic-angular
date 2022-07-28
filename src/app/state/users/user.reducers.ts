import { createReducer, on } from '@ngrx/store';
import { LoginAuthGuardService } from 'src/app/route_guards/login/login-authguard.service';
import * as UserActionTypes from './user.actions';

export type UserType = {
  collection: Comic_ShortBoxed_SplitTitle_Image[];
  pullList: string[];
};
const initialState: UserType = {
  collection: [],
  pullList: [],
};

export const userReducer = createReducer(
  initialState,

  on(UserActionTypes.loadUserAction, (state) => {
    return { ...state };
  }),
  on(UserActionTypes.userLoadSuccess, (state, { user }) => {
    return { ...user.user };
  }),
  on(UserActionTypes.userLoadFailure, (state, { error }) => ({
    ...state,
  })),

  on(UserActionTypes.addPullAction, (state) => {
    return { ...state };
  }),
  on(UserActionTypes.pullAddSuccess, (state, { pullList }) => {
    const newState = Object.assign({}, state, { pullList: pullList });
    return newState;
  }),
  on(UserActionTypes.pullAddFailure, (state, { error }) => ({
    ...state,
  })),

  on(UserActionTypes.removePullAction, (state) => {
    return { ...state };
  }),
  on(UserActionTypes.pullRemoveSuccess, (state, { pullList }) => {
    const newState = Object.assign({}, state, { pullList: pullList });
    return newState;
  }),
  on(UserActionTypes.pullRemoveFailure, (state, { error }) => ({
    ...state,
  })),

  on(UserActionTypes.addCollectionAction, (state) => {
    return { ...state };
  }),
  on(UserActionTypes.collectionAddSuccess, (state, { collection }) => {
    const newState = Object.assign({}, state, { collection: collection });
    return newState;
  }),
  on(UserActionTypes.collectionAddFailure, (state, { error }) => ({
    ...state,
  })),

  on(UserActionTypes.removeCollectionAction, (state) => {
    return { ...state };
  }),
  on(UserActionTypes.collectionRemoveSuccess, (state, { collection }) => {
    const newState = Object.assign({}, state, { collection: collection });
    return newState;
  }),
  on(UserActionTypes.collectionAddFailure, (state, { error }) => ({
    ...state,
  }))
);
