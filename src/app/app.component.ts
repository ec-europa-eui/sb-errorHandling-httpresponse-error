import { Component, OnDestroy , Injector} from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserState, UserState } from '@eui/core';
import { Observable, Subscription } from 'rxjs';
import { I18nService } from '@eui/core';
import { LANG_PARAM_KEY } from '@eui/core';
import { HttpClient } from '@angular/common/http';
import { LogService, Logger } from '@eui/core';
import { HttpErrorResponse } from '@angular/common/http';

export type HttpErrorCallbackFn = (error: HttpErrorResponse, injector: Injector) => void;




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
    userInfos: UserState;
    // Observe state changes
    userState: Observable<UserState>;
    // an array to keep all subscriptions and easily unsubscribe
    subs: Subscription[] = [];

    sidebarItems = [
        { label: 'Home', url: 'screen/home', iconClass: 'eui-icon-home' },
    ];
    notificationItems = [
        { label: 'Title label 1', subLabel: 'Subtitle label' },
        { label: 'Title label 2', subLabel: 'Subtitle label' },
        { label: 'Title label 3', subLabel: 'Subtitle label' },
        { label: 'Title label 4', subLabel: 'Subtitle label' },
    ];
    title : any;

    constructor(private store: Store<any>,protected i18nService: I18nService,protected http: HttpClient,
        private log: LogService) {
        this.userState = <any>this.store.select(getUserState);
        this.subs.push(this.userState.subscribe((user: UserState) => {
            this.userInfos = { ...user };
        }));
        this.i18nService.init();
    }
    ngOnInit() {
        this.loadInitialData();
       
    }
    private loadInitialData() {
        this.userState.
        subscribe((data) => {
            try {
                 this.title = data.someProperty.title;
            } catch(e) {
                this.log.warn(e.toString());
            }        
            
    
    });
    }

    ngOnDestroy() {
        this.subs.forEach((s: Subscription) => s.unsubscribe());
    }
   
}
