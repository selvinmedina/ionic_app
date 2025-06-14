import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private readonly headers = new HttpHeaders({
    Authorization: `token ${environment.githubToken}`,
  });

  constructor(private http: HttpClient) {}

  /**
   * Get list of GitHub users for feed view
   */
  getUsers(since: number): Observable<GitHubUserSummary[]> {
    return this.http.get<GitHubUserSummary[]>(
      `${this.BASE_URL}/users?since=${since}&per_page=${this.USERS_PER_PAGE}`,
      { headers: this.headers }
    );
  }

  /**
   * Get full user details by username
   */
  getUserByUsername(username: string): Observable<GitHubUserDetail> {
    return this.http.get<GitHubUserDetail>(
      `${this.BASE_URL}/users/${username}`,
      { headers: this.headers }
    );
  }
}
