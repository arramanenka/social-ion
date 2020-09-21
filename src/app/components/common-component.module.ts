import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {UserMiniatureComponent} from './user-miniature/user-miniature.component';
import {RouterModule} from '@angular/router';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {LoadingComponent} from './loading/loading.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
    ],
    declarations: [
        UserMiniatureComponent, MainMenuComponent, LoadingComponent
    ],
    exports: [
        UserMiniatureComponent, MainMenuComponent, LoadingComponent
    ]
})
export class CommonComponentModule {
}
