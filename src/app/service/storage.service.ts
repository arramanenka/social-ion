import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IdentityService} from './identity.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private host = 'localhost:8082';

    constructor(
        private http: HttpClient,
        private identityService: IdentityService
    ) {
    }

    uploadImage(file: any): Observable<UploadedResource> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<UploadedResource>(
            `http://${this.host}/file?id=${this.identityService.getSelfId()}&fileName=${file.name.replace('.*\\', '')}`,
            formData);
    }
}

export interface UploadedResource {
    resourceLink: string;
}
