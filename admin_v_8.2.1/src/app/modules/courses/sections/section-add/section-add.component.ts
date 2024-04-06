import { Component } from '@angular/core';
import { CourseSectionService } from '../../service/course-section.service';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent {

  isLoading$:any;

  title:any = '';
  course_id:any = '';

  SECTIONS:any =[];

  constructor(
    public courseSectionService: CourseSectionService,
    public activateRoute:ActivatedRoute,
    public toaster: ToastrService
  
  ){
    
  }

  ngOnInit(): void {
    this.isLoading$ = this.courseSectionService.isLoading$;
    
    this.activateRoute.params.subscribe((resp:any) => {
      this.course_id = resp.id;
    })
    
    this.courseSectionService.listSections().subscribe((resp:any) => {
      this.SECTIONS = resp.sections;
    })
  }

  save(){
    if(!this.title){
      this.toaster.error(' ES NECESARO UN TITULO PARA REGISTRAR UNA SECCION', 'ERROR ⛔');
      return;
    }

    let data = {
      course: this.course_id,
      title: this.title,
    
    }
    this.courseSectionService.registerSections(data).subscribe((resp:any) => {
           console.log(resp);

           if( resp.message == 403){
            this.toaster.error('ESTA SECCIÓN YA EXISTE POR FAVOR ELIJE UNO DIFERENTE ! ⚠️')
           }else{
            this.title = '';
            this.toaster.success('LA SECCION SE REGISTRO EXITOSAMENTE !!  ✅')
           }
     
    
    })
  }
}
