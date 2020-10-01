import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CommonComponentModule} from './components/common-component.module';
import {HttpClientModule} from '@angular/common/http';

export function setUpTheme() {
    return () => {
        const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (darkTheme) {
            document.body.setAttribute('data-theme', 'dark');
        }
    };
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CommonComponentModule, HttpClientModule],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: APP_INITIALIZER, useFactory: setUpTheme, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
