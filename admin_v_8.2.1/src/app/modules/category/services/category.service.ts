import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  listCategorie(search: any = null,state:any = null ){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let LINK = "?T=";
    if(search)
      {LINK += "&search="+search;
    }
    if(state){
      LINK += "&state="+state;
    }
    let URL = URL_SERVICIOS+"/categories/list"+LINK
    return this.http.get( URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)));
  
  }

  registerCategorie(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/categories/register";
    return this.http.post(URL, data, {headers: headers}).pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  updateCategorie(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/categories/update";
    return this.http.post(URL, data, {headers: headers}).pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  removeCategorie(categorie_id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/categories/remove/"+categorie_id;
    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)));
  }
}
