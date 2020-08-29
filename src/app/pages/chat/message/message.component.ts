import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../model/message';
import {Either} from '../chat.page';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

    @Input()
    chatContent: Either<Message, Date>;
    @Input()
    viewerId: string;

    constructor() {
    }

    ngOnInit() {
    }

}
