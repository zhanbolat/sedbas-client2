import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {BONITA_URL} from '../../app.component';
import {User} from '../model/user';
import {ResponseModel} from '../rest-api/response';
import {RestApiService} from '../rest-api/rest.api.service';
import {Session} from '../model/session';
import {DataMappingInterface} from '../rest-api/data.mapping.interface';
import {SessionMapping} from '../rest-api/session.mapping';

@Injectable()
export class AuthService extends RestApiService {
    private readonly LOGIN_SERVICE_PATH: string = '/loginservice'
    private readonly LOGOUT_SERVICE_PATH: string = '/logoutservice'
    private readonly CURRENT_SESSION_RESOURCE_PATH = '/API/system/session/unusedid'
    // isLoggedIn = false;

    constructor(private http: Http) {
        super()
        // private configService: ConfigService,

        // initialize authentication using current session
        // this.getCurrentSession()
        //     .subscribe(
        //         currentSession => configService.session = currentSession
        //     )
    }

    private static handleError(error: any) {
        const errorMessage = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : `Server error`;
        console.log(errorMessage);
        return Observable.throw(errorMessage);
    }

    login1(user: User): Observable<boolean> {
        console.log('Login function called. ');
        console.log('Username: ', user.username);
        console.log('Password: ', user.password);

        return this.http.post('', user)
            .map(response => response.json())
            .map((currentUser: User) => {
                console.log('Return isLoggedIn true. currentUser: ' + currentUser.username);
                if (!User.isNull(currentUser)) {
                    // this.isLoggedIn = true;
                    return true;
                } else {
                    // this.isLoggedIn = false;
                    return false;
                }
            })
            .catch(AuthService.handleError);
    }

    executeLogin(user: User): Observable<ResponseModel> {
        let credsUrlEncoded: string = 'username=' + user.username + '&password=' + user.password + '&redirect=false'
        let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        let options: RequestOptions = new RequestOptions({ headers: headers })
        let postUrl: string = BONITA_URL + this.LOGIN_SERVICE_PATH

        return this.http.post(postUrl, credsUrlEncoded, options)
            .map(this.mapSuccessResponse)
            .catch(this.handleResponseError)
    }

    getCurrentSession(): Observable<Session> {
        let sessionMapping: DataMappingInterface = new SessionMapping()
        let defaultHeaders: Headers = new Headers({ 'Content-Type': 'application/json' })
        let options: RequestOptions = new RequestOptions({ headers: defaultHeaders })
        return this.http.get(BONITA_URL + this.CURRENT_SESSION_RESOURCE_PATH, options)
            .map(sessionMapping.mapResponse)
            .catch(this.handleResponseError)
    }

    executeLogout(): Observable<ResponseModel> {
        // let credsUrlEncoded: string = 'username=' + user.username + '&password=' + user.password + '&redirect=false'
        // let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        // let options: RequestOptions = new RequestOptions({ headers: headers })
        let getUrl: string = BONITA_URL + this.LOGOUT_SERVICE_PATH

        return this.http.get(getUrl)
            .map(this.mapSuccessResponse)
            .catch(this.handleResponseError)
    }

    // login(user: User): Observable<boolean> {
    //     this.executeLogin(user)
    //         .subscribe(
    //             successResponse => {
    //                 // this.successResponse = successResponse
    //                 this.getCurrentSession()
    //                     .subscribe(
    //                         session => {
    //                             if (user.username === session.user_name) {
    //                                 // this.configService.session = session
    //                                 // if (creds.navigateTo) { this.router.navigate([creds.navigateTo]) }
    //                                 return true;
    //                             } else {
    //                                 return false
    //                             }
    //                         },
    //                         errorResponse => {
    //                             console.log('Error response: ', errorResponse.message);
    //                             return false;
    //                         }
    //                         // errorResponse => this.errorResponse = errorResponse
    //                     )
    //             },
    //             errorResponse => {
    //                 console.log('Error response: ', errorResponse.message);
    //                 return false;
    //             }
    //             // errorResponse => this.errorResponse = errorResponse
    //         )
    // }

}
