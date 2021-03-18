import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { User, Channel, ContextCustomer, DigitalImagePublicKey } from 'src/app/core/models/session';
import { map, tap, shareReplay, filter, find } from 'rxjs/operators';
import { HttpWrapperService } from '../http-wrapper/http-wrapper.service';
import { HttpParams } from '@angular/common/http';
import * as R from "ramda";
@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private user: User;
    private channel: Channel;
    private parameter: any;
    private feature: any;
    private contextCustomer: ContextCustomer;
    private digitalImagePublicKey: DigitalImagePublicKey;
    private lastUserActionTime: Date = new Date();
    private featureBehaviorSubject$: BehaviorSubject<any>
    constructor(private httpWrapperService: HttpWrapperService) { }

    loadSession() {

    }
    get locale() {
        return this.channel?.locale;
    }
    get countryCode() {
        return this.channel?.countryCode;
    }
    get bizSegment() {
        return this.user?.bizSegment;
    }
    get currentCalendarDate() {
        return this.channel?.hostDate
    }
    public getFeatureByName(featureName) {

        return this.featureBehaviorSubject$.pipe();
    }
    public getParameterByName(paramName: string) {
        return this.parameter[paramName]
    }

    loadSessionByCountryCode(countryCode: string = 'SG'): Observable<any> {
        //cache session data
        const httpParams = new HttpParams().set('ccode', countryCode)
        return this.httpWrapperService.get(`session`, httpParams).pipe(tap(res => {
            const value = res?.body
            this.user = value.user;
            this.channel = value.channel;
            this.parameter = value.parameter;

            this.feature = R.mergeAll(Object.values(value.featureWithGroup) as any[])
            this.featureBehaviorSubject$ = new BehaviorSubject(this.feature);
            this.contextCustomer = value.contextCustomer;
            this.digitalImagePublicKey = value.digitalImagePublicKey;
            //alert(this.user.id);
            //alert(this.feature["accountOpeningFormPrint"]);
            // if (this.channel.displayDateFormat) {
            // UiComponentConstants.displayDateFormat = this.channel.displayDateFormat;
            // this.utilityService.setDisplayFormat(this.channel.displayDateFormat);
            // }

            // HttpHeaderConstants.countryCode = this.countryCode;
            // HttpHeaderConstants.channelId = this.channelId;

            // this.content.setCurrentLocale(this.locale, 'core').then(value => {
            //   resolve(true);
            // });
        }))
    }

    public updateProductToggle(data, type) {
        let body = { features: [] };
        for (let key in data) {
            //body.features.push({key: key, flag: data[key]});
            // if (data[key] != this.initialToggles[type][key])
            //     body.features.push({ key: key, flag: data[key] });
        }
        let reqData = {};
        if (type) {
            reqData[type] = body;
        } else {
            reqData = body;
        }
        //this.api.updateFeatures(body).subscribe(
        this.httpWrapperService.post('features/update', reqData).subscribe(
            value => {
                // this.currentToggles[type] = data;
                // this.toggles$.next(this.currentToggles);
                // this.featureSubject$.next(this.parameter[paramName])
            },
            error => {
                // this.modalService.alert(error);
            }
        );
    }
}
