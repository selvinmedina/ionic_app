import { createFeature, createReducer, on, createSelector, createActionGroup, props } from '@ngrx/store';
import { GitHubUserSummary } from './models/github-user-summary.model';
import { GitHubUserDetail } from './models/github-user-detail.model';

export interface GitHubState {
  users: GitHubUserDetail[];
  selectedUser: GitHubUserDetail | null;
  loading: boolean;
  error: string | null;
  since: number;
}

const initialState: GitHubState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  since: 0,
};

export const GitHubActions = createActionGroup({
  source: 'GitHub',
  events: {
    'Load Users': props<{ since: number }>(),
    'Load Users Success': props<{ users: GitHubUserDetail[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Load User By Username': props<{ username: string }>(),
    'Load User By Username Success': props<{ user: GitHubUserDetail }>(),
    'Load User By Username Failure': props<{ error: string }>(),
  },
});

export const githubFeature = createFeature({
  name: 'github',
  reducer: createReducer(
    initialState,

    on(GitHubActions.loadUsers, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(GitHubActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users: [...state.users, ...users],
      loading: false,
      since: users.length > 0 ? users[users.length - 1].id : state.since,
    })),

    on(GitHubActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(GitHubActions.loadUserByUsername, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(GitHubActions.loadUserByUsernameSuccess, (state, { user }) => ({
      ...state,
      selectedUser: user,
      loading: false,
    })),

    on(GitHubActions.loadUserByUsernameFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),

  extraSelectors: ({ selectGithubState, selectUsers, selectSelectedUser }) => ({
    selectGithubState,
    selectUsers,
    selectSelectedUser,
    selectLoading: createSelector(selectGithubState, (state) => state.loading),
    selectError: createSelector(selectGithubState, (state) => state.error),
    selectSince: createSelector(selectGithubState, (state) => state.since),
  }),
});
