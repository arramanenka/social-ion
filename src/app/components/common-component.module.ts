import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {UserMiniatureComponent} from './user-miniature/user-miniature.component';
import {RouterModule} from '@angular/router';
import {MainMenuComponent} from './main-menu/main-menu.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
    ],
    declarations: [
        UserMiniatureComponent, MainMenuComponent
    ],
    exports: [
        UserMiniatureComponent, MainMenuComponent
    ]
})
export class CommonComponentModule {
}
