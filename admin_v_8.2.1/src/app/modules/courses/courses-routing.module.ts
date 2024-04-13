import { CourseListComponent } from './course-list/course-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseDeleteComponent } from './course-delete/course-delete.component';
import { CoursesComponent } from './courses.component';
import { SectionAddComponent } from './sections/section-add/section-add.component';
import { ClasesAddComponent } from './sections/clases/clases-add/clases-add.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      { path: 'registro', component: CourseAddComponent },

      { path: 'editar/:id', component: CourseEditComponent },

      { path: 'lista/seccion/:id', component: SectionAddComponent },

      { path: 'lista/seccion/clases/:id', component: ClasesAddComponent },

      { path: 'lista', component: CourseListComponent },

      // {path: 'ver/:id', component: CourseListComponent} ,
      // {path: 'eliminar/:id', component: CourseDeleteComponent} ,
      // {path: '**', redirectTo: 'registro'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
