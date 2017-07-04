import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AdalService, OAuthData, AuthHttp } from 'ng2-adal/core';
import * as adalLib from 'adal-angular';
import User = adal.User;
import { AdalConfigService } from './adal-config.service';


import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  loggedIn = false;

  private authHeaders: Headers;
  private tokenResource: string;

  constructor(
    private http: Http,
    private adalConfigService: AdalConfigService,
    private authHttp: AuthHttp,
    private adalService: AdalService) {
      this.tokenResource = this.adalConfigService.adalConfig.clientId;
  }

  clearCache() {
    this.adalService.clearCache()
      console.log('clearCache success');
  }

  getUser() {
    this.adalService
      .getUser()
      .subscribe(user => {
        console.log('got user', user);
        this.currentUser = user;
        this.userLoadededEvent.emit(user);
      },
      error => {
        //console.log(error)
        console.log('getUser error');
      },
      () => console.log('getUser complete'));
  }

  isLoggedIn(): Observable<boolean> {
    return this.adalService
      .getUser()
      .map<User, boolean>((user) => {
        if (user) {
          return this.adalService.userInfo.isAuthenticated;
        } else {
          return false;
        }
      })
      .catch((err) => { return Observable.of(false); })
  }

  public acquireToken(): Observable<string> {
      // return this.adalService.acquireToken("https://graph.microsoft.com")
      return this.adalService.acquireToken(this.tokenResource);
  }

  callSecretApi(): Observable<Response> {
    const url = `${environment.apiServerUrl}/api/secrets`;
    return this.callApi(url);
  }

  callClaimsApi(): Observable<Response> {
    const url = `${environment.apiServerUrl}/api/secrets`;
    return this.callApi(url);
  }

  callValuesApi(): Observable<Response> {
    const url = `${environment.apiServerUrl}/api/secrets`;
    return this.callApi(url);
  }

  callApi(url: string): Observable<Response> {
    //const access_token = this.adalService.getCachedToken(this.tokenResource);
    return this.adalService
      .acquireToken(this.tokenResource)
      .flatMap<string, Response>((token) => {

        this._setAuthHeaders(token);
        return this.AuthGet(url);
      });
  }

  /**
   * Example of how you can make auth request using angulars http methods.
   * @param options if options are not supplied the default content type is application/json
   */
  AuthGet(url: string, options?: RequestOptions): Observable<Response> {

    if (options) {
      options = this._setRequestOptions(options);
    } else {
      options = this._setRequestOptions();
    }
    return this.http.get(url, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthPut(url: string, data: any, options?: RequestOptions): Observable<Response> {

    const body = JSON.stringify(data);

    if (options) {
      options = this._setRequestOptions(options);
    } else {
      options = this._setRequestOptions();
    }
    return this.http.put(url, body, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthDelete(url: string, options?: RequestOptions): Observable<Response> {

    if (options) {
      options = this._setRequestOptions(options);
    } else {
      options = this._setRequestOptions();
    }
    return this.http.delete(url, options);
  }
  /**
   * @param options if options are not supplied the default content type is application/json
   */
  AuthPost(url: string, data: any, options?: RequestOptions): Observable<Response> {

    const body = JSON.stringify(data);

    if (options) {
      options = this._setRequestOptions(options);
    } else {
      options = this._setRequestOptions();
    }
    return this.http.post(url, body, options);
  }

  private _setAuthHeaders(access_token, token_type = 'Bearer') {
    access_token = access_token || this.adalService.getCachedToken(this.adalConfigService.adalConfig.clientId);
    this.authHeaders = new Headers();
    this.authHeaders.append('Authorization', token_type + ' ' + access_token);
    this.authHeaders.append('Content-Type', 'application/json');
  }
  public _setRequestOptions(options?: RequestOptions) {

    if (options) {
      options.headers.append(this.authHeaders.keys[0], this.authHeaders.values[0]);
    } else {
      options = new RequestOptions({ headers: this.authHeaders, body: '' });
    }

    return options;
  }
}
