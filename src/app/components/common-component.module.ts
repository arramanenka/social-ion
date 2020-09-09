import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {UserMiniatureComponent} from './user-miniature/user-miniature.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
    ],
    declarations: [
        UserMiniatureComponent
    ],
    exports: [
        UserMiniatureComponent
    ]
})
export class CommonComponentModule {
}
