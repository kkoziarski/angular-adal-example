import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs/Rx'
// import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';

import { AdalService, OAuthData } from 'ng2-adal/dist/core';
import * as adalLib from 'adal-angular';
import User = adal.User;
import { AdalConfigService } from './adal-config.service';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  loggedIn = false;

  private authHeaders: HttpHeaders;
  private tokenResource: string;

  constructor(
    private http: HttpClient,
    private adalConfigService: AdalConfigService,
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
        // console.log(error)
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
      .catch((err) => Observable.of(false))
  }

  public acquireToken(): Observable<string> {
      // return this.adalService.acquireToken("https://graph.microsoft.com")
      return this.adalService.acquireToken(this.tokenResource);
  }

  callSecretApi(): Observable<HttpResponse<Object>> {
    const url = `${environment.apiServerUrl}/api/secrets`;
    return this.callApi(url);
  }

  callClaimsApi(): Observable<HttpResponse<Object>> {
    const url = `${environment.apiServerUrl}/api/secrets`;
    return this.callApi(url);
  }

  callValuesApi(): Observable<HttpResponse<Object>> {
    const url = `${environment.apiServerUrl}/api/secrets`;
    return this.callApi(url);
  }

  callApi(url: string): Observable<HttpResponse<Object>> {
    // const access_token = this.adalService.getCachedToken(this.tokenResource);
    return this.adalService
      .acquireToken(this.tokenResource)
      .flatMap<string, HttpResponse<Object>>((token) => {

        this._setAuthHeaders(token);
        return this.AuthGet(url);
      });
  }

  /**
   * Example of how you can make auth request using angulars http methods.
   * @param headers if options are not supplied the default content type is application/json
   */
  AuthGet(url: string, headers?: HttpHeaders): Observable<HttpResponse<Object>> {

    if (headers) {
      headers = this._setRequestOptions(headers);
    } else {
      headers = this._setRequestOptions();
    }
    return this.http.get<HttpResponse<Object>>(url, { headers: headers });
    // return this.http.get(url, { headers: headers });
  }
  /**
   * @param headers if options are not supplied the default content type is application/json
   */
  AuthPut(url: string, data: any, headers?: HttpHeaders): Observable<HttpResponse<Object>> {

    const body = JSON.stringify(data);

    if (headers) {
      headers = this._setRequestOptions(headers);
    } else {
      headers = this._setRequestOptions();
    }
    return this.http.put<HttpResponse<Object>>(url, body, { headers: headers });
  }
  /**
   * @param headers if options are not supplied the default content type is application/json
   */
  AuthDelete(url: string, headers?: HttpHeaders): Observable<HttpResponse<Object>> {

    if (headers) {
      headers = this._setRequestOptions(headers);
    } else {
      headers = this._setRequestOptions();
    }
    return this.http.delete<HttpResponse<Object>>(url, { headers: headers });
  }
  /**
   * @param headers if options are not supplied the default content type is application/json
   */
  AuthPost(url: string, data: any, headers?: HttpHeaders): Observable<HttpResponse<Object>> {

    const body = JSON.stringify(data);

    if (headers) {
      headers = this._setRequestOptions(headers);
    } else {
      headers = this._setRequestOptions();
    }
    return this.http.post<HttpResponse<Object>>(url, body, { headers: headers });
  }

  private _setAuthHeaders(access_token, token_type = 'Bearer') {
    access_token = access_token || this.adalService.getCachedToken(this.adalConfigService.adalConfig.clientId);
    this.authHeaders = new HttpHeaders();
    this.authHeaders = this.authHeaders.set('Authorization', token_type + ' ' + access_token);
    this.authHeaders = this.authHeaders.set('Content-Type', 'application/json');
  }
  public _setRequestOptions(headers?: HttpHeaders)  {

    if (headers) {
      headers.set('Authorization', this.authHeaders.get('Authorization'));
    } else {
      return this.authHeaders;
    }

    return headers;
  }
}
