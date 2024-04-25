import { Component, EventEmitter, Input } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.scss']
})
export class CourseDeleteComponent {
  @Input() COURSE: any;
  @Input() COURSED: EventEmitter<any> = new EventEmitter();

  constructor(
    public courseService: CoursesService,
    public toaster: ToastrService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

  delete() {
    if (this.COURSE && this.COURSE._id) {
      this.courseService
        .removeCourses(this.COURSE._id)
        .subscribe((resp: any) => {
          console.log(resp);
          this.COURSED.emit('');
          this.modal.close();
          this.toaster.success(
            'CURSO ELIMINADA EXITOSAMENTE ',
            'VALIDACIONES'
          );
        });
    } else {
      console.error('CATEGORIE no es válido:', this.COURSE);
    }
  }
}


