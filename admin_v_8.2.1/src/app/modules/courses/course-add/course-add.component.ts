import { Component } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent {

  CATEGORIES:any = [];
  USERS:any = [];
  FILE_IMAGEN:any;
  IMAGEN_PREVIZUALIZAR:any="";
  isLoading$:any;

  descripcion:any ='';
  categorie:string = '';
  level:string = '';
  idioma:string= '';
  
  user:any= "";

  title:string = '';
  subtitle:string = '';

  price_usd:number = 0;
  price_dop:number = 0;
  price_mxn:number = 0;

  requirements_text:string = '';
  requirements:any = [];

  who_is_for_text:string= ''
  who_is_it_for:any = [];

  constructor(
    public CourseService: CoursesService,
    public toaster: ToastrService
  ) { }

  ngOnInit(): void{
    this.isLoading$ = this.CourseService.isLoading$;

    this.CourseService.ConfigAll().subscribe((resp:any) =>{

    console.log(resp);
    this.CATEGORIES = resp.categories;
    this.USERS = resp.users;
    })
    
  }

  processFile($event:any){

    if($event.target.files[0].type.indexOf("image") < 0){
      this.toaster.error('SOLAMENTE SE ACEPTAN IMAGENES DE TIPO (jpg, jpeg , png)', 'VALIDACIONES');
      return;    }
      this.FILE_IMAGEN = $event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.FILE_IMAGEN);
      reader.onloadend = () => this.IMAGEN_PREVIZUALIZAR = reader.result; 
      this.CourseService.isLoadingSubject.next(true)
      setTimeout(() => {
        this.CourseService.isLoadingSubject.next(false)
      },100)
  }

  
  addRequirements(){
    if (!this.requirements_text) {
      this.toaster.error('EL  TEXTO ES REQUERIDO', 'VALIDACIONES');
      return;
    }
    this.requirements.push(this.requirements_text);
    
    setTimeout(() => {
      this.requirements_text = '';

      this.CourseService.isLoadingSubject.next(true);
      setTimeout(() => {
        this.CourseService.isLoadingSubject.next(false);
      } ,50)
    },20);
    
    
  }
  
  
  addWhois(){
    if (!this.who_is_for_text) {
      this.toaster.error('EL  TEXTO ES REQUERIDO', 'VALIDACIONES');
      return;
    }
    this.who_is_it_for.push(this.who_is_for_text);

    setTimeout(() => {
      this.who_is_for_text = '';
      this.CourseService.isLoadingSubject.next(true);
      setTimeout(() => {
        this.CourseService.isLoadingSubject.next(false);
      } ,50)
    },20);


  }

  deleteWhois(i:any){ 
    this.who_is_it_for.pop();
    this.who_is_for_text = '';
   }

   deleteRequirements(i:any){
    this.requirements.pop();
    this.requirements_text = '';
   }

  onChange($event:any){

    this.descripcion = $event.editor.getData();
    console.log(this.descripcion);
    console.log($event.editor.getData);
    console.log($event.editor.getData.length);
    if($event.editor.getData.length > 200){
      this.toaster.error('SOLAMENTE SE ACEPTAN 200 CARACTERES', 'VALIDACIONES');
      return;
    }
    this.CourseService.isLoadingSubject.next(true)
    setTimeout(() => {
      this.CourseService.isLoadingSubject.next(false)
    },100)
  }

 save() {
    if (!this.title || !this.subtitle || !this.price_usd || !this.price_dop || !this.price_mxn || !this.categorie || !this.level || !this.idioma || !this.user || !this.descripcion || !this.FILE_IMAGEN || this.requirements.length == 0 || this.who_is_it_for.length == 0) {
        this.toaster.error('TODOS LOS CAMPOS SON REQUERIDOS', 'VALIDACIONES');
        return;
    }

    let formData = new FormData();
    formData.append('title', this.title);
    formData.append('subtitle', this.subtitle);
    formData.append('price_usd', this.price_usd + "");
    formData.append('price_dop', this.price_dop + "");
    formData.append('price_mxn', this.price_mxn + "");
    formData.append('categorie', this.categorie);
    formData.append('level', this.level);
    formData.append('idioma', this.idioma);
    formData.append('user', this.user);
      console.log(this.user, "hola");
    formData.append('description', this.descripcion);
    formData.append('requirements', JSON.stringify(this.requirements));
    formData.append('who_is_it_for', JSON.stringify(this.who_is_it_for));
    formData.append('portada', this.FILE_IMAGEN);

    this.CourseService.registerCourses(formData).subscribe((resp: any) => {
        console.log(resp);
        this.toaster.success('CURSO AGREGADO EXITOSAMENTE !! ', 'SUCCESS');
    });
}


}
