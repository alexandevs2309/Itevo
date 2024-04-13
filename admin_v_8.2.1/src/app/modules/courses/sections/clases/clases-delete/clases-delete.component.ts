import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseClasesService } from '../../../service/course-clases.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clases-delete',
  templateUrl: './clases-delete.component.html',
  styleUrls: ['./clases-delete.component.scss']
})
export class ClasesDeleteComponent {
  @Input() CLASE: any;
  @Output() ClaseD: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal: NgbActiveModal,
    public courseClaseService: CourseClasesService,
    public toaster: ToastrService
  ) {}

  ngOnInit(): void {}


  delete(){
    this.courseClaseService.removeClases(this.CLASE._id).subscribe((resp:any) =>{
      console.log(resp);
      this.ClaseD.emit('');
      this.modal.close();
      this.toaster.info('CLASE ELIMINADA EXITOSAMENTE !')
  
    })
  }
 
}
