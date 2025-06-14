import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadComponent: () =>
          import('../pages/feed/feed.page').then((m) => m.FeedPage),
      },
      {
        path: 'user-search',
        loadComponent: () =>
          import('../pages/user-search/user-search.page').then((m) => m.UserSearchPage),
      },
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
    ],
  },
];
