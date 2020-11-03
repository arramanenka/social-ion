import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private zone: NgZone) {
    }

    public queryJsonStream<R>(url: string): Observable<R> {
        return new Observable(observer => {
            const eventSource = new EventSource(url);
            eventSource.onmessage = e => {
                observer.next(JSON.parse(e.data));
            };
            eventSource.onerror = er => {
                if (eventSource.readyState !== eventSource.CONNECTING) {
                    this.zone.run(() => observer.error(er));
                }
                eventSource.close();
                this.zone.run(() => observer.complete());
            };
            return () => {
                eventSource.close();
            };
        });
    }
}
