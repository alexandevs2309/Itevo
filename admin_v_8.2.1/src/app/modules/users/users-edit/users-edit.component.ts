import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent {
  @Input() USER:any

  @Output() UserE: EventEmitter<any> = new EventEmitter();


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
      ngOnInit(): void {
        this.rol = this.USER.rol;
        this.name = this.USER.name;
        this.surname = this.USER.surname;
        this.email = this.USER.email;
        this.profession = this.USER.profession;
        this.description = this.USER.description;
        this.FILE_BACKGROUND = this.USER.avatar;
        // console.log(this.USER)
        // console.log(this.FILE_BACKGROUND)
        // console.log(this.FILE_AVATAR)
        // console.log(this.USER.avatar)
        // console.log(this.USER.avatar.indexOf("http"))
        // console.log(this.USER.avatar.indexOf("http") > -1)
        // if(this.USER.avatar.indexOf("http") > -1){
        //   this.FILE_BACKGROUND = this.USER.avatar;
        // }else{
        //   this.FILE_BACKGROUND = 'assets/media/avatars/300-6.jpg';
        
      }
  
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
       if(!this.name ||  !this.surname || !this.email){
        this.toaster.error('TODOS LOS CAMPOS SON OBLIGATORIOS', 'VALIDACIONES');
        return;
       }
       let formData = new FormData();

       formData.append('_id', this.USER._id);
       
       if(this.FILE_AVATAR){
         formData.append('avatar', this.FILE_AVATAR);
       }

       formData.append('name' , this.name);
       formData.append('surname', this.surname);
       formData.append('email' , this.email);
       if(this.password){
         formData.append('password', this.password);

       }
       formData.append('rol', this.rol);

       if (this.profession) {
        
         formData.append('profession', this.profession);
       }
       
       if (this.description) {
        formData.append('description', this.description);
       }
  
      this.userService.update(formData).subscribe((resp:any) => {
        console.log(resp);
        this.UserE.emit(resp.user);
        this.modal.close();
        this.toaster.success('Usuario actualizado', 'USUARIO');
      })
  
  
    }
  
}