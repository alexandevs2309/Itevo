import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CKEditorModule } from 'ckeditor4-angular'


@NgModule({
  declarations: [
    CoursesComponent,
    CourseAddComponent,
    CourseEditComponent,
    CourseListComponent,
    CourseDeleteComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,

    CKEditorModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,


  ]
})
export class CoursesModule { }
