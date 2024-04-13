import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSectionService } from '../../service/course-section.service';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionEditComponent } from '../section-edit/section-edit.component';
import { SectionDeleteComponent } from '../section-delete/section-delete.component';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss'],
})
export class SectionAddComponent {
  isLoading$: any;

  title: any = '';
  course_id: any = '';

  SECTIONS: any = [];

  constructor(
    public courseSectionService: CourseSectionService,
    public activateRoute: ActivatedRoute,
    public toaster: ToastrService,
    public modalService : NgbModal
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.courseSectionService.isLoading$;
    this.activateRoute.params.subscribe((resp: any) => {
      this.course_id = resp.id;
      
    });

    this.courseSectionService.listSections(this.course_id).subscribe((resp: any) => {
      console.log(resp)
      this.SECTIONS = resp.sections;
    });
  }

  save() {
    if (!this.title) {
      this.toaster.error('EL TITULO ES REQUERIDO PARA REGISTRAR UNA SECCION');
      return;
    }

    let data = {
      course: this.course_id,
      title: this.title,
    };
    this.courseSectionService.registerSections(data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        this.toaster.error('LA SECCION YA EXISTE , INTENTE CON UNA DIFERENTE');
      } else {
        this.title = '';
        this.SECTIONS.unshift(resp.section);
        this.toaster.success('SECCION REGISTRADA CON EXITO');
      }
    });
  }
  editSection(SECTION:any){
    const modalref = this.modalService.open(SectionEditComponent,{size: 'md' , centered:true});
    modalref.componentInstance.SECTION = SECTION;
   
    modalref.componentInstance.SectionE.subscribe((EditSection:any) => {
      let INDEX = this.SECTIONS.findIndex((item:any) => item._id == EditSection._id);
      if(INDEX != -1){
        this.SECTIONS[INDEX] = EditSection;
      }
    })
  }

// ...

deleteSection(SECTION: any) {
  const modalref = this.modalService.open(SectionDeleteComponent, { size: 'md', centered: true });
  modalref.componentInstance.SECTION = SECTION;

  modalref.componentInstance.SectionD.subscribe(() => {
    const INDEX = this.SECTIONS.findIndex((item: any) => item._id === SECTION._id);
    if (INDEX !== -1) {
      this.SECTIONS.splice(INDEX, 1);
    }
    this.courseSectionService.listSections(this.course_id).subscribe((resp: any) => {
      this.SECTIONS = resp.sections;
    });
  });
}

}
