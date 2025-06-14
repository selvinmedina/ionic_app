# Ionic GitHub App

A mobile-ready Ionic + Angular application that integrates with the GitHub Users API, using NgRx for robust state management.

## Features

### Feed Tab
- Loads GitHub users with infinite scrolling.
- Displays avatar and login for each user.
- Highlights users with more than 2 public repositories using a custom directive.
- Clicking a user redirects to the Search tab with pre-filled data.

### Search Tab
- Search bar to look up users by login.
- Pre-populates input if navigated from Feed tab.
- Displays avatar, full name, bio, company, location, and blog.
- Opens external links using Capacitor’s `Browser` plugin (in-app).

## Tech Stack
- Ionic Framework with Angular 17+
- NgRx (Store, Effects)
- Capacitor 7
- Standalone Components
- GitHub REST API (authenticated)
