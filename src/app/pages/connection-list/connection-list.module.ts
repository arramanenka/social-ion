import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ConnectionListPageRoutingModule} from './connection-list-routing.module';

import {ConnectionListPage} from './connection-list.page';
import {CommonComponentModule} from '../../components/common-component.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConnectionListPageRoutingModule,
        CommonComponentModule
    ],
    declarations: [ConnectionListPage]
})
export class ConnectionListPageModule {
}
