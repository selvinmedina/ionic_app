export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  public_repos: number;
  html_url: string;
  name?: string;
  bio?: string;
  company?: string;
  location?: string;
  blog?: string;
}
