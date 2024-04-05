import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class CourseSectionService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  listSections(){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
   
    let URL = URL_SERVICIOS+"/course_section/list"
    return this.http.get( URL,{headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)));
  
  }

  registerSections(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_section/register";
    return this.http.post(URL, data, {headers: headers}).pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  updateSections(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_section/update";
    return this.http.post(URL, data, {headers: headers}).pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  removeCategorie(categorie_id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_section/remove/"+categorie_id;
    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)));
  }
}


