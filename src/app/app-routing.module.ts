import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainMenuComponent} from './components/main-menu/main-menu.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'inbox',
        pathMatch: 'full',
    },
    {
        path: '',
        component: MainMenuComponent,
        children: [
            {
                path: 'profile',
                pathMatch: 'full',
                loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
            },
            {
                path: 'inbox',
                loadChildren: () => import('./pages/inbox/inbox.module').then(m => m.InboxPageModule)
            }
        ]
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    },
    {
        path: 'chat',
        loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule)
    },
    {
        path: 'connection-list',
        loadChildren: () => import('./pages/connection-list/connection-list.module').then(m => m.ConnectionListPageModule)
    },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
