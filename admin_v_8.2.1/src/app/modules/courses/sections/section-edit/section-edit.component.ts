import { Component, Input, Output , EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseSectionService } from '../../service/course-section.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss']
})
export class SectionEditComponent {
@Input() SECTION:any
@Output() SectionE: EventEmitter<any> = new EventEmitter();

title:any = '';
state: number = 1;

constructor(
  public modal :NgbActiveModal,
  public courseSectionService: CourseSectionService,
  public toaster: ToastrService
){}

ngOnInit(): void {
this.title = this.SECTION.title;  
this.state = this.SECTION.state;
}

 save(){
  if(!this.title){
    this.toaster.error('TITULO VACIO  ES NESESARIO PROPORCIONAR UN TITULO');
    return;
  }


  let data = {
    title: this.title,
    state: this.state,
    _id: this.SECTION._id
  }
   this.courseSectionService.updateSections(data).subscribe((resp:any) => {
     if(resp.message == 403){
       this.toaster.error('LA SECCION YA EXISTE , INTENTE CON UNA DIFERENTE');
     }else{
       this.title = '';
       this.SectionE.emit(resp.section);
       this.toaster.success('SECCION ACTUALIZADA CON EXITO');
       this.modal.close();
     }
   })
}

}