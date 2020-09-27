import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {InboxPageRoutingModule} from './inbox-routing.module';

import {InboxPage} from './inbox.page';
import {CommonComponentModule} from '../../components/common-component.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InboxPageRoutingModule,
        CommonComponentModule
    ],
    declarations: [InboxPage]
})
export class InboxPageModule {
}
