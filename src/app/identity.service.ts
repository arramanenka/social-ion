import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IdentityService {

    constructor() {
    }

    getSelfId() {
        return '0';
    }
}
