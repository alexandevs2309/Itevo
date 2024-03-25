import { Component, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent {
  @Input() CATEGORIE: any;
  @Input() CategorieD: EventEmitter<any> = new EventEmitter();
  
  constructor(
    public categoryServices: CategoryService,
    public toaster: ToastrService,
    public modal: NgbActiveModal, 
  ) { }

  ngOnInit(): void {
  }

  delete() {
    if (this.CATEGORIE && this.CATEGORIE._id) { 
      this.categoryServices.removeCategorie(this.CATEGORIE._id).subscribe((resp: any) => {
        console.log(resp);
        this.CategorieD.emit('');
        this.modal.close();
        this.toaster.success('CATEGORIA ELIMINADA EXITOSAMENTE ', 'VALIDACIONES');

      });
    } else {
      console.error('CATEGORIE no es válido:', this.CATEGORIE); 
    }
  }
  
  

  
}
