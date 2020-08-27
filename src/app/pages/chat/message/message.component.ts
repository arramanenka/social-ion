import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../model/message';
import {MessageView} from '../chat.page';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

    @Input()
    message: MessageView;
    @Input()
    viewerId: string;

    constructor() {
    }

    ngOnInit() {
    }

}
