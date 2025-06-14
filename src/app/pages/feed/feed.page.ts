import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { githubFeature, GitHubActions } from 'src/app/store/github/github-user.feature';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  private store = inject(Store);

  users$ = this.store.select(githubFeature.selectUsers);
  loading$ = this.store.select(githubFeature.selectLoading);
  since$ = this.store.select(githubFeature.selectSince);

  /**
   * Dispatch initial load of GitHub users
   */
  constructor() {
    this.store.dispatch(GitHubActions.loadUsers({ since: 0 }));
  }

  /**
   * Dispatch next batch of users using the current "since" value
   */
  loadMoreUsers(event: Event) {
    this.since$.subscribe((since) => {
      this.store.dispatch(GitHubActions.loadUsers({ since }));
      // Complete the scroll event after dispatch
      setTimeout(() => (event.target as HTMLIonInfiniteScrollElement).complete(), 500);
    }).unsubscribe();
  }
}
