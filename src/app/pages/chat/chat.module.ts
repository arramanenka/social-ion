import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ChatPageRoutingModule} from './chat-routing.module';

import {ChatPage} from './chat.page';
import {AutosizeModule} from 'ngx-autosize';
import {MessageComponent} from './message/message.component';
import {CommonComponentModule} from '../../components/common-component.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChatPageRoutingModule,
        AutosizeModule,
        CommonComponentModule
    ],
    declarations: [ChatPage, MessageComponent]
})
export class ChatPageModule {
}
