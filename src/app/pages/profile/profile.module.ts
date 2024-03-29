import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {ProfilePage} from './profile.page';
import {ProfileHeadComponent} from './profile-head/profile-head.component';
import {CommonComponentModule} from '../../components/common-component.module';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {AutosizeModule} from 'ngx-autosize';
import {UserRecommendationsComponent} from './user-recommendations/user-recommendations.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        CommonComponentModule,
        AutosizeModule,
        ReactiveFormsModule
    ],
    declarations: [ProfilePage, ProfileHeadComponent, ProfileEditComponent, UserRecommendationsComponent]
})
export class ProfilePageModule {
}
