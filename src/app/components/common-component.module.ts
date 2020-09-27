import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {UserMiniatureComponent} from './user-miniature/user-miniature.component';
import {RouterModule} from '@angular/router';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {LoadingComponent} from './loading/loading.component';
import {AvatarComponent} from './avatar/avatar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
    ],
    declarations: [
        UserMiniatureComponent, MainMenuComponent, LoadingComponent, AvatarComponent
    ],
    exports: [
        UserMiniatureComponent, MainMenuComponent, LoadingComponent, AvatarComponent
    ]
})
export class CommonComponentModule {
}
