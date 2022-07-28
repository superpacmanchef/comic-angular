import * as userReducer from './users/user.reducers';
import { createSelector } from '@ngrx/store';

const UserFeature = (state: any) => {
  return state.userStore;
};

export const getUser = createSelector(
  UserFeature,
  (state: userReducer.UserType) => {
    return state;
  }
);
export const getCollection = createSelector(
  UserFeature,
  (state: userReducer.UserType) => {
    return state.collection;
  }
);
export const getPullList = createSelector(
  UserFeature,
  (state: userReducer.UserType) => {
    return state.pullList;
  }
);
