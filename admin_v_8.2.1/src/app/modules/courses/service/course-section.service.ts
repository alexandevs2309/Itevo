import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize, catchError } from 'rxjs';
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


  listSections(course_id: string) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token });

    let URL = URL_SERVICIOS + "/course_section/list"+(course_id ? "?course_id="+course_id : '');
    return this.http.get(URL, {
      headers: headers,
      params: { course_id: course_id }  // Envía course_id como un parámetro de consulta
    }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  registerSections(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token });
    let URL = URL_SERVICIOS + "/course_section/register";
    return this.http.post(URL, data, { headers: headers }).pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  updateSections(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token });
    let URL = URL_SERVICIOS + "/course_section/update";
    return this.http.post(URL, data, { headers: headers }).pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  removeSection(section_id: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ "token": this.authservice.token });
    let URL = URL_SERVICIOS + "/course_section/remove/" + section_id;
    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false)));
  }
}


