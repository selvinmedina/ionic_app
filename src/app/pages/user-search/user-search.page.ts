import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewWillEnter } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  GitHubActions,
  githubFeature,
} from 'src/app/store/github/github-user.feature';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.page.html',
  styleUrls: ['./user-search.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonAvatar,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
    IonSearchbar,
  ],
})
export class UserSearchPage implements ViewWillEnter {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  user$ = this.store.select(githubFeature.selectSelectedUser);
  loading$ = this.store.select(githubFeature.selectLoading);
  error$ = this.store.select(githubFeature.selectError);

  searchTerm = '';

  ionViewWillEnter() {
    this.route.queryParams.subscribe((params) => {
      const username = params['username'];
      if (username) {
        this.searchTerm = username;
        this.store.dispatch(
          GitHubActions.loadUserByUsername({ username: username })
        );
      } else {
        this.searchTerm = '';
        this.store.dispatch(GitHubActions.clearSelectedUser());
      }
    });
  }

  /**
   * Trigger GitHub user search using the value from the search bar.
   */
  onSearch() {
    const trimmed = this.searchTerm.trim();
    if (trimmed.length > 0) {
      this.store.dispatch(
        GitHubActions.loadUserByUsername({ username: trimmed })
      );
    }
  }

  /**
   * Open blog URL in new tab
   */
  async openBlog(url: string) {
    const safeUrl = url.startsWith('http') ? url : `https://${url}`;
    await Browser.open({ url: safeUrl });
  }
}
