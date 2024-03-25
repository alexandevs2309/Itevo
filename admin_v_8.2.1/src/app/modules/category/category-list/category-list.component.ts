import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryAddComponent } from '../category-add/category-add.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  CATEGORIES :any = []
  isLoading: any;
  search: string = '';
  state: string = '';

  constructor(
    public modalServices: NgbModal,
    public categoryServices:CategoryService,
    public cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef

    ) { 
    
  }
  ngOnInit(): void{
  this.isLoading = this.categoryServices.isLoading$;
    this.listCategory();
  }
  listCategory(){
    this.categoryServices.listCategorie(this.search , this.state).subscribe((resp:any) => {
      console.log(resp)
      this.CATEGORIES  = resp.categories;
    })
  }

  registerCategory() {
    const modalRef = this.modalServices.open(CategoryAddComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.CategoryC.subscribe((Categorie: any) => {
      console.log(Categorie);
      this.CATEGORIES = [Categorie, ...this.CATEGORIES]; // Crear un nuevo arreglo con la nueva categoría
      this.cdr.markForCheck(); // Llamar a markForCheck() después de actualizar el arreglo

    });
  }


  editCategory(CATEGORIE : any) {
    const modalRef = this.modalServices.open(CategoryEditComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.CATEGORIE = CATEGORIE ;
    modalRef.componentInstance.CategoryE.subscribe((Categorie: any) => {
      let INDEX = this.CATEGORIES.findIndex((item: any) => item._id == CATEGORIE._id);
      if (INDEX !== -1 && Categorie) {
        this.CATEGORIES[INDEX] = { ...Categorie };
        this.cdr.markForCheck(); // Llamar a markForCheck() después de actualizar el arreglo
        
      }
    });
    
  }

  deleteCategory(CATEGORIE: any) {
    const modalRef = this.modalServices.open(CategoryDeleteComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.CATEGORIE = CATEGORIE; 
    modalRef.componentInstance.CategorieD.subscribe((val: any) => {
      let INDEX = this.CATEGORIES.findIndex((item: any) => item._id == CATEGORIE._id);
      if (INDEX != -1) {
        this.CATEGORIES.splice(INDEX, 1);
      }
     
     
    });
  }
  
  
}
