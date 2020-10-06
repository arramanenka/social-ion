import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    public queryJsonStream<R>(url: string): Observable<R> {
        return new Observable(observer => {
            const eventSource = new EventSource(url);
            eventSource.onmessage = e => {
                observer.next(JSON.parse(e.data));
            };
            eventSource.onerror = er => {
                if (eventSource.readyState !== eventSource.CONNECTING) {
                    observer.error(er);
                }
                eventSource.close();
                observer.complete();
            };
            return () => {
                eventSource.close();
            };
        });
    }
}
