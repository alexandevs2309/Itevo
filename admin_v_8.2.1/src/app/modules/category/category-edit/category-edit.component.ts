import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {
  @Input() CATEGORIE :any;
  @Output() CategoryE: EventEmitter<any> = new EventEmitter();
  
  
  title:string = '';
  state:number = 0;
  
  
  FILE_IMAGE:any;
  FILE_BACKGROUND:any = 'assets/media/avatars/300-6.jpg';
  
  
    constructor(
      public toaster: ToastrService,
      public categoryService: CategoryService,
      public modal: NgbActiveModal, 
    ) { }
  
      ngOnInit(): void {
        this.title = this.CATEGORIE.title;
        this.FILE_BACKGROUND = this.CATEGORIE.imagen;
        this.state = this.CATEGORIE.state;
      }
    avatar($event:any){
      if($event.target.files[0].type.indexOf("image") < 0){
        this.toaster.error('SOLAMENTE SE ACEPTAN IMAGENES DE TIPO (jpg, jpeg , png)', 'VALIDACIONES');
        return;    }
        this.FILE_IMAGE = $event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(this.FILE_IMAGE);
        reader.onloadend = () => this.FILE_BACKGROUND = reader.result;
    }
    save(){
       if( !this.title){
        this.toaster.error('TODOS LOS CAMPOS SON OBLIGATORIOS', 'VALIDACIONES');
        return;
       }
      

       
       let formData = new FormData();

       if(this.FILE_IMAGE){
       formData.append('imagen', this.FILE_IMAGE);
       }
       formData.append('title' , this.title);
       formData.append('state', this.state+"");
       formData.append('_id', this.CATEGORIE._id);
  
      this.categoryService.updateCategorie(formData).subscribe((resp:any) => {
        console.log(resp);
        this.CategoryE.emit(resp.categorie);
        this.modal.close();
        this.toaster.success('CATEGORIA EDITADA CORRECTAMENTE', 'EXITO');

       
        // console.log(this.title);
        // console.log(this.state);
        // console.log(this.FILE_IMAGE);
        // console.log(formData);
     
        // window.location.href = window.location.href + '?timestamp=' + new Date().getTime();

      },
      
      (error: any) => {
        console.error('Error al actualizar la categoría:', error);
        this.toaster.error('Error al actualizar la categoría', 'ERROR');
    })
  
  
    }
}
