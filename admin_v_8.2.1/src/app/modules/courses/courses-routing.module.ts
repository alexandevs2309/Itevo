import { CourseListComponent } from './course-list/course-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent, children :[
      {path: 'registro', component: CourseAddComponent} , 
      {path: 'editar', component: CourseEditComponent} ,
      {path: 'lista', component: CourseListComponent} ,
      
      // {path: 'ver/:id', component: CourseListComponent} ,
      // {path: 'eliminar/:id', component: CourseDeleteComponent} ,
      // {path: '**', redirectTo: 'registro'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
