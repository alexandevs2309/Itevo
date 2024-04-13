import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { CourseSectionService } from '../../service/course-section.service';

@Component({
  selector: 'app-section-delete',
  templateUrl: './section-delete.component.html',
  styleUrls: ['./section-delete.component.scss'],
})
export class SectionDeleteComponent {
  @Input() SECTION: any;
  @Output() SectionD: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal: NgbActiveModal,
    public courseSectionService: CourseSectionService,
    public toaster: ToastrService
  ) {}

  ngOnInit(): void {}


  delete(){
    this.courseSectionService.removeSection(this.SECTION._id).subscribe((resp:any) =>{
      console.log(resp);
      this.SectionD.emit('');
      this.modal.close();
      this.toaster.success('SECCION ELIMINADA EXITOSAMENTE !')
  
    })
  }
 
}
