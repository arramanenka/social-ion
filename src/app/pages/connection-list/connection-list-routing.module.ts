import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConnectionListPage} from './connection-list.page';

const routes: Routes = [
    {
        path: ':uid/:type',
        component: ConnectionListPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConnectionListPageRoutingModule {
}
