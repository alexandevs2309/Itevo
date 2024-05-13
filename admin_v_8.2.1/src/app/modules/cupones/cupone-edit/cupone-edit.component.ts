import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CuponesService } from '../service/cupones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cupone-edit',
  templateUrl: './cupone-edit.component.html',
  styleUrls: ['./cupone-edit.component.scss']
})
export class CuponeEditComponent {
  code: any = null;
  type_discount: number = 1;
  type_cupon: number = 1;
  num_use: number = 0;
  discount: number = 0;
  type_count: number = 1;
  COURSES: any = [];
  COURSE_SELECTED: any = [];
  CATEGORIES: any = []
  CATEGORIE_SELECTED: any = [];

  course_id: any = null;
  categorie_id: any = null;
  isLoading$: any;

  CUPON_SELECTED: any = null;
  CUPON_ID: any;

  constructor
    (public cuponeService: CuponesService,
      public toaster: ToastrService,
      public activedRouter: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.cuponeService.isLoadingSubject.asObservable();
    this.activedRouter.params.subscribe((resp: any) => {
      console.log(resp);
      this.CUPON_ID = resp.id;
    })
    this.cuponeService.ConfigAll().subscribe((resp: any) => {
      console.log(resp);
      this.COURSES = resp.courses;
      this.CATEGORIES = resp.categories;

      // this.code = resp.code;
      // this.discount = resp.discount;
      // this.num_use = resp.num_use;
      // this.type_discount = resp.type_discount;
      this.cuponeService.showCupone(this.CUPON_ID).subscribe((resp: any) => {
        console.log(resp);
        this.CUPON_SELECTED = resp.cupon;
        this.code = this.CUPON_SELECTED.code;
        this.discount = this.CUPON_SELECTED.discount;
        this.num_use = this.CUPON_SELECTED.num_use;
        this.type_discount = this.CUPON_SELECTED.type_discount;
        this.type_count = this.CUPON_SELECTED.type_count;
        this.type_cupon = this.CUPON_SELECTED.type_cupon;
  
        if (this.type_cupon == 1) {
          this.CUPON_SELECTED.courses.forEach((element: any) => {
            let COURSE_S = this.COURSE_SELECTED.find((item: any) => item._id == element._id);
            if (!COURSE_S) {
              let COURSE_T = this.COURSES.find((item: any) => item._id == element._id);
              this.COURSE_SELECTED.push(COURSE_T);
            }
          });
        } else {
          this.CUPON_SELECTED.categories.forEach((element: any) => {
            let CATEGORIE_S = this.CATEGORIE_SELECTED.find((item: any) => item._id == element._id);
            if (!CATEGORIE_S) {
              let CATEGORIE_T = this.CATEGORIES.find((item: any) => item._id == element._id);
              this.CATEGORIE_SELECTED.push(CATEGORIE_T);
            }
  
          });
        }
      })
    })

  }



  save() {
    if (!this.code || !this.discount) {
      this.toaster.error('TODOS LOS CAMPOS DEBEN SER COMPLETADOS');
      return;
    }

    if (this.type_count == 2 && this.num_use == 0) {
      this.toaster.error('NESECITAS LLENAR UN NUMERO DE USO LIMITE ');
      return;
    }

    if (this.type_cupon == 1 && this.COURSE_SELECTED.length == 0) {
      this.toaster.error('NESECITAS SELECIONAR UN CURSO ');
      return;
    }

    if (this.type_cupon == 2 && this.CATEGORIE_SELECTED.length == 0) {
      this.toaster.error('NESECITAS SELECIONAR UNA CATEGORIA ');
      return;
    }

    let courses_selected: any = [];
    let categorie_selected: any = [];

    this.COURSE_SELECTED.forEach((element: any) => {
      courses_selected.push({
        _id: element._id,

      })
    });

    this.CATEGORIE_SELECTED.forEach((element: any) => {
      categorie_selected.push({
        _id: element._id,
      })
    })

    let data = {
      code: this.code,
      discount: this.discount,
      type_discount: this.type_discount,
      type_count: this.type_count,
      num_use: this.num_use,
      type_cupon: this.type_cupon,
      courses: courses_selected,
      categories: categorie_selected,
      _id: this.CUPON_ID,
    }

    this.cuponeService.updatCupone(data).subscribe((resp: any) => {
      console.log(resp)
      if (resp.message == 403) {
        this.toaster.error(resp.message_text, 'Error');
      } else {
        this.toaster.success('Cupón actualizado con éxito', 'Exito');
        // this.code = null;
        // this.discount = 0;
        // this.type_discount = 1;
        // this.type_count = 1;
        // this.num_use = 0;
        // this.type_cupon = 1;
        // this.COURSE_SELECTED = [];
        // this.CATEGORIE_SELECTED = [];

      }
    })


  }


  selectedTipeDiscount(val: number) {
    this.type_discount = val;
  }

  selectedTypeCount(val: number) {
    this.type_count = val;
  }
  selectedTypeCupon(val: number) {
    this.type_cupon = val;
    this.COURSE_SELECTED = [];
    this.CATEGORIE_SELECTED = [];
    this.course_id = '';
    this.categorie_id = '';
  }

  addCourse() {
    if (this.course_id) {
      let COURSE_INDEX = this.COURSES.findIndex((item: any) => item._id === this.course_id);

      if (COURSE_INDEX != -1) {
        let VALID_EXIST_COURSE = this.COURSE_SELECTED.find((item: any) => item._id === this.course_id);
        if (VALID_EXIST_COURSE) {
          this.toaster.error('EL CURSO YA FUE AGREGADO, ANTERIORMENTE YA A SIDO AGREGADO !!!')
          return;
        } else {
          this.COURSE_SELECTED.push(this.COURSES[COURSE_INDEX]);
          this.course_id = '';
        }
      }
    } else {
      this.toaster.error('DEBES SELECIONAR UN CURSO PARA PODER AGREGARLO')
    }
  }

  addCategorie() {
    if (this.categorie_id) {

      let CATEGORIE_INDEX = this.CATEGORIES.findIndex((item: any) => item._id === this.categorie_id);

      if (CATEGORIE_INDEX != -1) {
        let VALID_EXIST_CATEGORIE = this.CATEGORIE_SELECTED.find((item: any) => item._id === this.categorie_id);
        if (VALID_EXIST_CATEGORIE) {
          this.toaster.error('EL CATEGORIA YA FUE AGREGADO, ANTERIORMENTE YA A SIDO AGREGADO !!!')
          return;
        } else {
          this.CATEGORIE_SELECTED.push(this.CATEGORIES[CATEGORIE_INDEX]);
          this.categorie_id = '';
        }
      }
    } else {
      this.toaster.error('DEBES SELECIONAR UNA CATEGORIA PARA PODER AGREGARLO')
    }
  }

  deleteCourse(COURSE_SELEC: any) {
    let COURSE_INDEX = this.COURSE_SELECTED.findIndex((item: any) => item._id === COURSE_SELEC._id);
    if (COURSE_INDEX != -1) {
      this.COURSE_SELECTED.splice(COURSE_INDEX, 1);
    }
  }


  deleteCategorie(CATEGORIE_SELEC: any) {
    let CATEGORIE_INDEX = this.CATEGORIE_SELECTED.findIndex((item: any) => item._id === CATEGORIE_SELEC._id);
    if (CATEGORIE_INDEX != -1) {
      this.CATEGORIE_SELECTED.splice(CATEGORIE_INDEX, 1);
    }
  }

}  