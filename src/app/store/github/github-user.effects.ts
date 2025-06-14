import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GitHubService } from 'src/app/core/services/github.service';
import { GitHubActions } from './github-user.feature';
import { catchError, map, mergeMap, of, from } from 'rxjs';
import { GitHubUserDetail } from './models/github-user-detail.model';

@Injectable()
export class GitHubUserEffects {
  private actions$ = inject(Actions);
  private githubService = inject(GitHubService);

  /**
   * Effect to load GitHub users for the feed
   */
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GitHubActions.loadUsers),
      mergeMap(({ since }) =>
        this.githubService.getUsers(since).pipe(
          mergeMap((users) =>
            from(
              Promise.all(
                users.map((u) =>
                  this.githubService.getUserByUsername(u.login).toPromise()
                )
              )
            )
          ),
          map((detailedUsers) =>
            GitHubActions.loadUsersSuccess({
              users: detailedUsers as GitHubUserDetail[],
            })
          ),
          catchError((error) =>
            of(
              GitHubActions.loadUsersFailure({
                error: error.message || 'Unknown error',
              })
            )
          )
        )
      )
    )
  );

  /**
   * Effect to load user details by username
   */
  loadUserByUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GitHubActions.loadUserByUsername),
      mergeMap(({ username }) =>
        this.githubService.getUserByUsername(username).pipe(
          map((user) => GitHubActions.loadUserByUsernameSuccess({ user })),
          catchError((error) =>
            of(
              GitHubActions.loadUserByUsernameFailure({
                error: error.message || 'Unknown error',
              })
            )
          )
        )
      )
    )
  );
}
