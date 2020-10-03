import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {ProfilePage} from './profile.page';
import {ProfileHeadComponent} from './profile-head/profile-head.component';
import {CommonComponentModule} from '../../components/common-component.module';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        CommonComponentModule
    ],
    declarations: [ProfilePage, ProfileHeadComponent, ProfileEditComponent]
})
export class ProfilePageModule {
}
