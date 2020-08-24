import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InboxPage} from './inbox.page';

const routes: Routes = [
    {
        path: '',
        component: InboxPage
    },
    {
        path: ':uid',
        component: InboxPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InboxPageRoutingModule {
}
