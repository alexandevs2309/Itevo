import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseClasesService } from '../../../service/course-clases.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-clases-edit',
  templateUrl: './clases-edit.component.html',
  styleUrls: ['./clases-edit.component.scss']
})
export class ClasesEditComponent {

  @Input() CLASE: any
  @Output() ClaseE: EventEmitter<any> = new EventEmitter();

  title: any = '';
  description: any = '';
  state: number = 1;
  FILE_VIDEO: any = null;
  FILE_DOCUMENT:any = null;
  FILES:any = [];
  loadVideo: boolean = true;
  link_video_vimeo: any = null;
  DOCUMENT_NAME:any = null;
  DOCUMENT_SIZE:any = null;

  constructor(
    public modal: NgbActiveModal,
    public courseClasesService: CourseClasesService,
    public toaster: ToastrService,
    public sanitizer: DomSanitizer,

  ) { }

  ngOnInit(): void {
    this.title = this.CLASE.title;
    this.state = this.CLASE.state;
    this.description = this.CLASE.description;
    this.link_video_vimeo = this.CLASE.vimeo_id;
    this.FILES = this.CLASE.files;
  }

  onChange($event: any) {
    this.description = $event.editor.getData();
  }

  save() {
    if (!this.title) {
      this.toaster.error('TITULO VACIO  ES NESESARIO PROPORCIONAR UN TITULO');
      return;
    }


    let data = {
      title: this.title,
      state: this.state,
      _id: this.CLASE._id
    }
    this.courseClasesService.updateClases(data).subscribe((resp: any) => {
      if (resp.message == 403) {
        this.toaster.error('LA CLASE YA EXISTE , INTENTE CON UNA DIFERENTE');
      } else {
        this.title = '';
        this.ClaseE.emit(resp.clase);
        this.toaster.success('CLASE ACTUALIZADA CON EXITO');
        this.modal.close();
      }
    })
  }

  processVideo($event: any) {
    this.FILE_VIDEO = $event.target.files[0];

  }

  processFile($event:any){
    console.log($event.target.files[0]);
    this.FILE_DOCUMENT = $event.target.files[0];
    this.DOCUMENT_NAME = this.FILE_DOCUMENT.name;
    this.DOCUMENT_SIZE = this.FILE_DOCUMENT.size;
  }


  uploadVimeo() {
    if (!this.FILE_VIDEO) {
      this.toaster.error('EL VIDEO ES REQUERIDO', 'VALIDACIONES');
      return;
    }
    let formData = new FormData();
    formData.append('video', this.FILE_VIDEO);
    formData.append("_id", this.CLASE._id);
    this.loadVideo = false;
    this.courseClasesService.uploadVimeo(formData).subscribe((resp: any) => {
      console.log(resp);
      this.loadVideo = true;
      this.link_video_vimeo = resp.vimeo_id;
      this.toaster.success('VIDEO  TRILLER AGREGADO EXITOSAMENTE !! ', 'SUCCESS');
    });
  }
  uploadFile(){
    if(!this.FILE_DOCUMENT){
      this.toaster.error('EL ARCHIVO ES REQUERIDO','VALIDACIONES');
      return;
    }
    let formData = new FormData();
    formData.append('recurso',this.FILE_DOCUMENT);
    formData.append("clase",this.CLASE._id);
    formData.append("file_name", this.DOCUMENT_NAME);
    formData.append("size", this.DOCUMENT_SIZE);
    this.courseClasesService.uploadFile(formData).subscribe((resp:any)=>{
      console.log(resp);
      this.FILES.unshift(resp.file);
      this.toaster.success('ARCHIVO AGREGADO CON EXITO !! ','SUCCESS');
    });
  }

  deleteFile(FILE:any){
    this.loadVideo = false;
    this.courseClasesService.removeClaseFile(FILE._id).subscribe((resp:any) => {
      console.log(resp);
      this.loadVideo = true;
      let INDEX = this.FILES.findIndex((item:any)=> item._id == FILE._id);

      if(INDEX != -1){
        this.FILES.splice(INDEX, 1);
      }
      this.toaster.success('ARCHIVO ELIMINADO CON EXITO !! ', 'SUCCESS');
    })
  }

  urlVideo() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_vimeo);

  }

}