import { Component, EventEmitter ,Output} from '@angular/core';
import {  ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent {
  @Output() UserC: EventEmitter<any> = new EventEmitter();


rol:string = '';
name:string = '';
surname:string = '';
email:string = '';
password:string = '';
profession : string = '';
description:string = '';

FILE_AVATAR:any;
FILE_BACKGROUND:any = 'assets/media/avatars/300-6.jpg';


  constructor(
    public toaster: ToastrService,
    public userService: UsersService,
    public modal: NgbActiveModal, 
  ) { }


  avatar($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.toaster.error('SOLAMENTE SE ACEPTAN IMAGENES DE TIPO (jpg, jpeg , png)', 'VALIDACIONES');
      return;    }
      this.FILE_AVATAR = $event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.FILE_AVATAR);
      reader.onload = () => this.FILE_BACKGROUND = reader.result;
  }
  save(){
     if(!this.name || !this.FILE_AVATAR || !this.email || !this.password){
      this.toaster.error('TODOS LOS CAMPOS SON OBLIGATORIOS', 'VALIDACIONES');
      return;
     }
     let formData = new FormData();
     formData.append('avatar', this.FILE_AVATAR);
     formData.append('name' , this.name);
     formData.append('surname', this.surname);
     formData.append('email' , this.email);
     formData.append('password', this.password);
     formData.append('rol', this.rol);
     formData.append('profession', this.profession);
     formData.append('description', this.description);

    this.userService.register(formData).subscribe((resp:any) => {
      console.log(resp);
      this.UserC.emit(resp.user);
      this.modal.close();
      this.toaster.success('USUARIO REGISTRADO EXITOSAMENETE ', 'VALIDACIONES');

    })


  }
}
