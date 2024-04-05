import { Component } from '@angular/core';
import { CourseSectionService } from '../../service/course-section.service';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent {

  isLoading$:any;
  title:any = '';
  course_id:any = '';

  constructor(
    public courseSectionService: CourseSectionService,
    public activateRoute:ActivatedRoute,
    public toaster: ToastrService
    // public courseService: CourseService,
    // public router: Router,
    // public route: ActivatedRoute,
    // public courseSectionService: CourseSectionService,
    // public courseService: CourseService,
    // public courseSectionService: CourseSectionService,
    // public courseSectionService: CourseSectionService,
  ){
    
  }

  ngOnInit(): void {
    this.isLoading$ = this.courseSectionService.isLoading$;
    this.activateRoute.params.subscribe((resp:any) => {
      this.course_id = resp.id;
    });
  
  }

  save(){
    let data = {
      course: this.course_id,
      title: this.title,
      // description: this.description,
      // order: this.order,
      // status: this.status,
      // type: this.type,
      // video_url: this.video_url,
      // video_duration: this.video_duration,
      // video_thumbnail: this.video_thumbnail,
      // video_title: this.video_title,
    }
    this.courseSectionService.registerSections(data).subscribe((resp:any) => {
      if (!this.title) {
        this.toaster.error('TITULO VACIO ,  ES NECESARIO UN TITULO !!', 'ERROR');
      
        return; 
      }
      console.log(resp);
      // this.courseSectionService.getSections();
      // this.courseSectionService.closeModal();
      // this.courseSectionService.showSuccess();
    
    })
  }
}
