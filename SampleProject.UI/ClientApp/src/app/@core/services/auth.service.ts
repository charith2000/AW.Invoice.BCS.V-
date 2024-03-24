import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "@core/services/storage.service";
import {ApiBaseService} from "@core/services/api-base.service";
import {LoginModel} from "@application/login/login.model";
import {LoginApi} from "@application/login/login.api";
import {BaseComponent} from "@core/components/base/base.component";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";

//const AUTH_API = 'http://159.138.100.223:8085/DMSCRIBBR/DMSSWE.SECURITY.WEBAPI/api/auth/';
//const AUTH_API = 'http://159.138.100.223:8085/DMSCRIBBR/DMSSWE.SECURITY.WEBAPI/api/auth/';
const AUTH_API = 'https://localhost:7211/api/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService extends BaseComponent{

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient,
    private storageService: StorageService,
    private apiBaseService: ApiBaseService,
    private jwtHelper: JwtHelperService
  )
  {
    super()
  }

  login(username: string, password: string): Observable<LoginModel> {
    let loginModel = {
      username,
      password
    } as LoginModel;
    return this.apiBaseService.post<LoginModel>([LoginApi.base],
        loginModel,
        true,
        true,
        'Successfully Login');
  }




  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'LogOut', {});
  }

  getUserName(): string | null {
    const token = this.storageService.getJwtToken()
    if (token ) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.sub;
    } else {
      return null;
    }
  }

  getUserRoles(): string[] {
    return this.storageService.getUser().permission
  }


  public isAuthenticated(): boolean {
    //const token = this.storageService.isLoggedIn();
    return this.storageService.isLoggedIn();
  }

  refreshToken() {
    debugger
    return this.http.post(AUTH_API + 'refresh-token', { }, httpOptions);
  }



}
