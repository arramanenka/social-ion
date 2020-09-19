import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {AuthGuard} from './auth.guard';

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
            },
            {
                path: 'search',
                loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
            },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'chat',
        loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'connection-list',
        loadChildren: () => import('./pages/connection-list/connection-list.module').then(m => m.ConnectionListPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: '**',
        loadChildren: () => import('./pages/notfound/notfound.module').then(m => m.NotfoundPageModule)
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
