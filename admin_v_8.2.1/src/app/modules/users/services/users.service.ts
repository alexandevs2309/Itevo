import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isLoading$: Observable<boolean>;
  isLoadingSubject:BehaviorSubject<boolean>

  constructor(
    private http: HttpClient,
    public authservice:AuthService,
  ) { 
    this.isLoadingSubject = new BehaviorSubject<boolean>(false)
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }
  listUser(search:any = null, rol:any = null){
    this.isLoadingSubject.next(true)
    let headers = new HttpHeaders({'token': this.authservice.token});
    let LINK = "?T=";
    
    
    if(search){
      LINK += "&search="+search;
  
    }

    if(rol){
      LINK += "&rol="+rol;
  
    }
    let URL = URL_SERVICIOS+"/users/list"+LINK;    
    return this.http.get(URL,{headers:headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false)),
    );
  }
  register(data:any){
    this.isLoadingSubject.next(true)
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS+"/users/register_admin";
    return this.http.post(URL, data, {headers:headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false)),
    );
  }

  update( data:any){
    this.isLoadingSubject.next(true)
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS+"/users/update";
    return this.http.post(URL, data, {headers:headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false)),
    );
  }
  remove(user_id:any){
    this.isLoadingSubject.next(true)
    let headers = new HttpHeaders({'token': this.authservice.token});
    let URL = URL_SERVICIOS+"/users/delete/"+user_id;
    return this.http.delete(URL, {headers:headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false)),
    );

  }
}
