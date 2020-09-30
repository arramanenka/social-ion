import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {IdentityService} from './service/identity.service';

@Injectable({
    providedIn: 'root'
})
export class TabGuard implements CanActivate {

    constructor(private identityService: IdentityService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (state.url.startsWith('/profile')) {
            if (state.url === `/profile/${this.identityService.getSelfId()}`) {
                this.router.navigateByUrl('profile').then();
                return false;
            }
        }
        return true;
    }

}
