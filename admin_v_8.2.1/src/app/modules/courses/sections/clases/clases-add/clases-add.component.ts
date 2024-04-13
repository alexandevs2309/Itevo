import { Component } from '@angular/core';
import { ClasesEditComponent } from '../clases-edit/clases-edit.component';
import { ClasesDeleteComponent } from '../clases-delete/clases-delete.component';
import { CourseClasesService } from '../../../service/course-clases.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clases-add',
  templateUrl: './clases-add.component.html',
  styleUrls: ['./clases-add.component.scss']
})
export class ClasesAddComponent {


  title: any= '';
  description:any = '';
  section_id: any = '';

  CLASES: any = [];
  isLoading$: any;


  constructor(
    public courseClasesService: CourseClasesService,
    public activateRoute: ActivatedRoute,
    public toaster : ToastrService,
    public modalService: NgbModal
  ) {
  }
  ngOnInit(): void {
    this.isLoading$ = this.courseClasesService.isLoading$;
    this.activateRoute.params.subscribe((resp: any) => {
      this.section_id = resp.id;
    });
  
    this.courseClasesService.listClases(this.section_id).subscribe((resp: any) => {
      console.log(resp)
      this.CLASES = resp.clases;
      
    });
  }
  

  onChange($event:any){
    this.description = $event.editor.getData();
  }

  save() {
    if (!this.title || !this.description) {
      this.toaster.error(' TITULO Y DESCRIPCION SON REQUERIDO PARA REGISTRAR UNA SECCION');
      return;
    }
  
    let data = {
      section: this.section_id,
      title: this.title,
      description: this.description,
    };
  
    this.courseClasesService.registerClases(data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        this.toaster.error('LA CLASE YA EXISTE , INTENTE CON UNA DIFERENTE');
      } else {
        this.title = '';
        this.description = '';
        this.CLASES.unshift(resp.clase);
        this.toaster.success('CLASE REGISTRADA CON EXITO');
        console.log(resp.clase);
      }
    });
  }
  


  editClase(CLASE: any) {
    const modalref = this.modalService.open(ClasesEditComponent, { size: 'md', centered: true });
    modalref.componentInstance.CLASE = CLASE;

    modalref.componentInstance.ClaseE.subscribe((EditClase: any) => {
      let INDEX = this.CLASES.findIndex((item: any) => item._id == EditClase._id);
      if (INDEX != -1) {
        this.CLASES[INDEX] = EditClase;
      }
    })
  }

  // ...

  deleteClase(CLASE: any) {
    const modalref = this.modalService.open(ClasesDeleteComponent, { size: 'md', centered: true });
    modalref.componentInstance.CLASE = CLASE;

    modalref.componentInstance.ClaseD.subscribe((EditSection:any) => {
      let INDEX = this.CLASES.findIndex((item: any) => item._id === CLASE._id);
      if (INDEX != -1) {
        this.CLASES.splice(INDEX, 1);
      }
     
    });
  }
}
