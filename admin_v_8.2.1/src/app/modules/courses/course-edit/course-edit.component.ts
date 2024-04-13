import { Component } from '@angular/core';
import { CoursesService } from '../service/courses.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent {

  CATEGORIES: any = [];
  USERS: any = [];
  FILE_IMAGEN: any;
  IMAGEN_PREVIZUALIZAR: any = "";
  isLoading$: any;

  description: any = '';
  state: any = '';
  categorie: string = '';
  level: string = '';
  idioma: string = '';

  user: string = "";

  title: string = '';
  subtitle: string = '';

  price_usd: number = 0;
  price_dop: number = 0;
  price_mxn: number = 0;

  requirements_text: string = '';
  requirements: any = [];

  who_is_for_text: string = ''
  who_is_it_for: any = [];

  course_id: any = null;

  COURSE_SELECTED: any = null;
  FILE_VIDEO: any = null;
  loadVideo: boolean = true;
  link_video_vimeo: any = null

  constructor(
    public CourseService: CoursesService,
    public toaster: ToastrService,
    public activateRouter: ActivatedRoute,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.CourseService.isLoading$;
    this.activateRouter.params.subscribe((resp: any) => {
      console.log(resp);
      this.course_id = resp.id;
    })

    this.CourseService.ConfigAll().subscribe((resp: any) => {

      this.CATEGORIES = resp.categories;
      this.USERS = resp.users;
      this.CourseService.showCourse(this.course_id).subscribe((resp: any) => {
        console.log(resp);
        this.COURSE_SELECTED = resp.course;

        this.IMAGEN_PREVIZUALIZAR = this.COURSE_SELECTED.imagen;
        this.title = this.COURSE_SELECTED.title;
        this.subtitle = this.COURSE_SELECTED.subtitle;
        this.description = this.COURSE_SELECTED.description;
        this.categorie = this.COURSE_SELECTED.categorie._id;
        this.level = this.COURSE_SELECTED.level;
        this.idioma = this.COURSE_SELECTED.idioma;
        this.user = this.COURSE_SELECTED.user._id;
        this.price_usd = this.COURSE_SELECTED.price_usd;
        this.price_dop = this.COURSE_SELECTED.price_dop;
        this.price_mxn = this.COURSE_SELECTED.price_mxn;
        this.requirements = this.COURSE_SELECTED.requirements;
        this.who_is_it_for = this.COURSE_SELECTED.who_is_it_for;
        this.state = this.COURSE_SELECTED.state;
        this.link_video_vimeo = this.COURSE_SELECTED.vimeo_id;




      })
    })

  }

  processFile($event: any) {

    if ($event.target.files[0].type.indexOf("image") < 0) {
      this.toaster.error('SOLAMENTE SE ACEPTAN IMAGENES DE TIPO (jpg, jpeg , png)', 'VALIDACIONES');
      return;
    }
    this.FILE_IMAGEN = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_IMAGEN);
    reader.onloadend = () => this.IMAGEN_PREVIZUALIZAR = reader.result;
    this.CourseService.isLoadingSubject.next(true)
    setTimeout(() => {
      this.CourseService.isLoadingSubject.next(false)
    }, 100)
  }

  processVideo($event: any) {
    this.FILE_VIDEO = $event.target.files[0];

  }


  addRequirements() {
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
      }, 50)
    }, 20);


  }


  addWhois() {
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
      }, 50)
    }, 20);


  }

  deleteWhois(i: any) {
    this.who_is_it_for.pop();
    this.who_is_for_text = '';
  }

  deleteRequirements(i: any) {
    this.requirements.pop();
    this.requirements_text = '';
  }

  onChange($event: any) {

    this.description = $event.editor.getData();
    console.log(this.description);
    console.log($event.editor.getData);
    console.log($event.editor.getData.length);
    if ($event.editor.getData.length > 200) {
      this.toaster.error('SOLAMENTE SE ACEPTAN 200 CARACTERES', 'VALIDACIONES');
      return;
    }
    this.CourseService.isLoadingSubject.next(true)
    setTimeout(() => {
      this.CourseService.isLoadingSubject.next(false)
    }, 100)
  }


  save() {
    if (!this.title || !this.subtitle || !this.price_usd || !this.price_dop || !this.price_mxn || !this.categorie || !this.level || !this.idioma || !this.description || this.requirements.length == 0 || this.who_is_it_for.length == 0) {
      this.toaster.error('TODOS LOS CAMPOS SON REQUERIDOS', 'VALIDACIONES');
      return;
    }

    const instructorSeleccionado = this.USERS.find((user: { name: string; surname: string; }) => user.name + ' ' + user.surname === this.user);
    const idInstructor = instructorSeleccionado ? instructorSeleccionado._id : null;
    let formData = new FormData();

    formData.append("_id", this.course_id)
    formData.append('title', this.title);
    formData.append('subtitle', this.subtitle);
    formData.append('state', this.state);
    formData.append('price_usd', this.price_usd + "");
    formData.append('price_dop', this.price_dop + "");
    formData.append('price_mxn', this.price_mxn + "");
    formData.append('categorie', this.categorie);
    formData.append('level', this.level);
    formData.append('idioma', this.idioma);
    formData.append('user', this.user); // Usa idInstructor aquí
    formData.append('description', this.description);
    formData.append('requirements', JSON.stringify(this.requirements));
    formData.append('who_is_it_for', JSON.stringify(this.who_is_it_for));

    if (this.FILE_IMAGEN) {
      formData.append('portada', this.FILE_IMAGEN);
    }

    this.CourseService.updateCourses(formData).subscribe((resp: any) => {
      if (resp.message == 403) {
        this.toaster.error('YA EXISTE UN USUARIO OCURSO CON ESTOS CAMPOS , INTENTA CON OTROS', 'ERROR');
        return;
      } else {


        this.toaster.success('CURSO ACTUALIZADO EXITOSAMENTE !! ', 'SUCCESS');
      }
    }, error => {
      this.toaster.error('HA OCURRIDO UN ERROR AL ACTUALIZAR EL CURSO', 'ERROR');
    });


  }

  uploadVimeo() {
    if (!this.FILE_VIDEO) {
      this.toaster.error('EL VIDEO ES REQUERIDO', 'VALIDACIONES');
      return;
    }
    let formData = new FormData();
    formData.append('video', this.FILE_VIDEO);
    formData.append("_id", this.course_id);
    this.loadVideo = false;
    this.CourseService.uploadVimeo(formData).subscribe((resp: any) => {
      console.log(resp);
      this.loadVideo = true;
      this.toaster.success('VIDEO  TRILLER AGREGADO EXITOSAMENTE !! ', 'SUCCESS');
    });
  }

  urlVideo() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_vimeo);

  }
}