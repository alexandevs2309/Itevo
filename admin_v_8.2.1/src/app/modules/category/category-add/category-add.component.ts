import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {

  @Output() CategoryC: EventEmitter<any> = new EventEmitter();
  
  
  title:string = '';
  // state:string = '';
  
  
  FILE_IMAGE:any;
  FILE_BACKGROUND:any = 'assets/media/avatars/300-6.jpg';
  
  
    constructor(
      public toaster: ToastrService,
      public categoryService: CategoryService,
      public modal: NgbActiveModal, 
    ) { }
  
  
    avatar($event:any){
      if($event.target.files[0].type.indexOf("image") < 0){
        this.toaster.error('SOLAMENTE SE ACEPTAN IMAGENES DE TIPO (jpg, jpeg , png)', 'VALIDACIONES');
        return;    }
        this.FILE_IMAGE = $event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(this.FILE_IMAGE);
        reader.onload = () => this.FILE_BACKGROUND = reader.result;
    }
    save(){
       if( !this.FILE_IMAGE || !this.title){
        this.toaster.error('TODOS LOS CAMPOS SON OBLIGATORIOS', 'VALIDACIONES');
        return;
       }
       let formData = new FormData();
       formData.append('imagen', this.FILE_IMAGE);
       formData.append('title' , this.title);
  
      this.categoryService.registerCategorie(formData).subscribe((resp:any) => {
        console.log(resp);
        this.CategoryC.emit(resp.categorie);
        this.modal.close();
        this.toaster.success('CATEGORIA REGISTRADA', 'EXITO');
     
  
      })
  
  
    }
  }
  




