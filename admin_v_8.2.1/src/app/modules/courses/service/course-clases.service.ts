import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize, catchError } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class CourseClasesService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  listClases(section_id: string): Observable<any> {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token });
  
    let URL = URL_SERVICIOS + "/course_clase/list"+(section_id ? "?section_id"+ section_id : '') // Revisa la URL correcta
    return this.http.get(URL, {
      headers: headers,
      params: { section_id: section_id } // Revisa el parámetro correcto
    }).pipe(
      finalize(() => this.isLoadingSubject.next(false)),
      catchError((error: any) => {
        console.error('Error al obtener clases:', error);
        throw error;
      })
    );
  }
  
  

  registerClases(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/register";
    return this.http.post(URL, data, {headers: headers}).pipe(
    finalize(() => this.isLoadingSubject.next(false)));
  }

  uploadVimeo(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/upload_vimeo";
    return this.http.post(URL, data, {headers: headers}).pipe(
    finalize(() => this.isLoadingSubject.next(false)));
  }

  uploadFile(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/register_file";
    return this.http.post(URL, data, {headers: headers}).pipe(
    finalize(() => this.isLoadingSubject.next(false)));
  }


  updateClases(data:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/update";
    return this.http.post(URL, data, {headers: headers}).pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  removeClases(section_id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/remove/"+section_id;
    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)));
  }

  removeClaseFile(file_id:any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token});
    let URL = URL_SERVICIOS+"/course_clase/delete_file/"+file_id;
    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false)));
  }
}


