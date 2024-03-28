import { Component } from '@angular/core';
import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  search:string = '';
  state:string = '';
  isLoading:any;
  COURSES:any = [];

  constructor( public courseService: CoursesService, ){

  }
ngOnInit(): void {
  this.isLoading = this.courseService.isLoading$;
  this.listCourse(); 
}


  listCourse(){
    this.courseService.listCourses().subscribe((resp:any) => {
      console.log(resp);
      this.COURSES = resp.courses;
    })
  }
}
