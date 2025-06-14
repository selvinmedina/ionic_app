import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GitHubUserSummary } from 'src/app/store/github/models/github-user-summary.model';
import { GitHubUserDetail } from 'src/app/store/github/models/github-user-detail.model';

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private readonly BASE_URL = environment.githubApiBaseUrl;
  private readonly USERS_PER_PAGE = 30;

  constructor(private http: HttpClient) {}

  /**
   * Get list of GitHub users for feed view
   * Uses the `since` parameter for pagination
   */
  getUsers(since: number): Observable<GitHubUserSummary[]> {
    return this.http.get<GitHubUserSummary[]>(
      `${this.BASE_URL}/users?since=${since}&per_page=${this.USERS_PER_PAGE}`
    );
  }

  /**
   * Get details of a GitHub user by their username
   */
  getUserByUsername(username: string): Observable<GitHubUserDetail> {
    return this.http.get<GitHubUserDetail>(`${this.BASE_URL}/users/${username}`);
  }
}
