import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersDeleteComponent } from './users-delete/users-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersAddComponent,
    UsersEditComponent,
    UsersDeleteComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,

    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule
  ]
})
export class UsersModule { }
