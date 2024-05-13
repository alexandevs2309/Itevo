import { Component } from '@angular/core';
import { DiscountService } from '../service/discount.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-discount-add',
  templateUrl: './discount-add.component.html',
  styleUrls: ['./discount-add.component.scss']
})
export class DiscountAddComponent {
  type_discount:number = 1;
  type_segment:number = 1;
  type_campaign = 1 ; 
  start_date:any = null ; 
  end_date:any = null;
  discount:number = 0;
  COURSES: any = [];
  COURSE_SELECTED:any = [];
  CATEGORIES:any = []
  CATEGORIE_SELECTED:any = [];
  
  course_id:any = null;
  categorie_id:any = null;
  isLoading$:any;
  
  constructor
  ( public discountService: DiscountService,
    public toaster: ToastrService
  )
  {}
  
  ngOnInit(): void {
    this.isLoading$ = this.discountService.isLoadingSubject.asObservable(); 
    this.discountService.ConfigAll().subscribe((resp:any) => {
      console.log(resp);
      this.COURSES = resp.courses;
      this.CATEGORIES = resp.categories;
      // this.code = resp.code;
      // this.discount = resp.discount;
      // this.num_use = resp.num_use;
      // this.type_discount = resp.type_discount;
  
  
    })
  }
  save(){
    if(!this.discount || !this.start_date || !this.end_date){
      this.toaster.warning('TODOS LOS CAMPOS DEBEN SER COMPLETADOS');
      return;
    }
  
    
    if (this.type_segment == 1 && this.COURSE_SELECTED.length == 0) {
      this.toaster.warning('NESECITAS SELECIONAR UN CURSO ');
      return; 
    }
  
    if (this.type_segment == 2 && this.CATEGORIE_SELECTED.length == 0) {
      this.toaster.warning('NESECITAS SELECIONAR UNA CATEGORIA ');
      return; 
    }
  
    let courses_selected:any = [];
    let categorie_selected:any = [];
    let courses_s: any = [] ;
    let categories_s:any = [];
   
    this.COURSE_SELECTED.forEach((element:any) => {
      courses_selected.push({
        _id: element._id,
  
      })
      courses_s.push(element._id)
    });
  
    this.CATEGORIE_SELECTED.forEach((element:any) => {  
      categorie_selected.push({
        _id: element._id,
      })
      categories_s.push(element._id)
    })
  
    let data = {
      discount: this.discount,
      type_discount: this.type_discount,  
      courses: courses_selected,
      categories: categorie_selected,
      courses_s,
      categories_s,
      start_date: this.start_date,
      end_date: this.end_date,
      start_date_num: new Date(this.start_date).getTime(),
      end_date_num: new Date(this.end_date).getTime(),
      type_campaign: this.type_campaign,
      type_segment: this.type_segment,
    }
  
  this.discountService.registerDiscount(data).subscribe((resp:any) =>{
      console.log(resp)
      if(resp.message == 403 ){
        this.toaster.error( resp.message_text ,'Error');
      }else{
        this.toaster.success('Cupón creado con éxito', 'Exito');
        this.type_discount = 1;
        this.discount =  0;
        this.type_segment = 1;
        this.type_campaign = 1;
        this.start_date = null;
        this.end_date = null;
        this.COURSE_SELECTED = [];
        this.CATEGORIE_SELECTED = [];
  
      }
    } )
  
  
  }  
  
  
  selectedTypeDiscount(val: number)
  {
    this.type_discount = val;
  }
  
  selectedTypeCampaign(val: number)
  {
    this.type_campaign = val;
  }


  selectedTypeCupon(val: number)
  {
    this.type_segment = val;
    this.COURSE_SELECTED =[];
    this.CATEGORIE_SELECTED= [];
    this.course_id = '';
    this.categorie_id = '';
  }
  
  addCourse(){
    if(this.course_id){
      let COURSE_INDEX = this.COURSES.findIndex((item:any) => item._id === this.course_id);
  
      if (COURSE_INDEX != -1){
        let VALID_EXIST_COURSE = this.COURSE_SELECTED.find((item:any) => item._id === this.course_id );
        if(VALID_EXIST_COURSE){
          this.toaster.error('EL CURSO YA FUE AGREGADO, ANTERIORMENTE YA A SIDO AGREGADO !!!')
          return;
        }else{
          this.COURSE_SELECTED.push( this.COURSES[COURSE_INDEX]);
          this.course_id = '';
        }
      }
    }else{
      this.toaster.error('DEBES SELECIONAR UN CURSO PARA PODER AGREGARLO')    
    }
  }
  
  addCategorie(){
    if(this.categorie_id){
  
      let CATEGORIE_INDEX = this.CATEGORIES.findIndex((item:any) => item._id === this.categorie_id);
      
      if (CATEGORIE_INDEX != -1){
        let VALID_EXIST_CATEGORIE = this.CATEGORIE_SELECTED.find((item:any) => item._id === this.categorie_id );
        if(VALID_EXIST_CATEGORIE){
          this.toaster.error('EL CATEGORIA YA FUE AGREGADO, ANTERIORMENTE YA A SIDO AGREGADO !!!')
          return;
        }else{
          this.CATEGORIE_SELECTED.push( this.CATEGORIES[CATEGORIE_INDEX]);
          this.categorie_id = '';
        }
      }
    }else{
      this.toaster.error('DEBES SELECIONAR UNA CATEGORIA PARA PODER AGREGARLO')    
    }
  }
  
  deleteCourse(COURSE_SELEC:any){
    let COURSE_INDEX = this.COURSE_SELECTED.findIndex((item:any) => item._id === COURSE_SELEC._id );
    if (COURSE_INDEX != -1){
      this.COURSE_SELECTED.splice(COURSE_INDEX, 1);
    }
  }
  deleteCategorie(CATEGORIE_SELEC:any){
    let CATEGORIE_INDEX = this.CATEGORIE_SELECTED.findIndex((item:any) => item._id === CATEGORIE_SELEC._id );
    if (CATEGORIE_INDEX != -1){
      this.CATEGORIE_SELECTED.splice(CATEGORIE_INDEX, 1);
    }
  }
  
  
  
  }
  
