import { Component, Input, EventEmitter } from '@angular/core';
import { UsersService } from '../services/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.scss']
})
export class UsersDeleteComponent {
  @Input() USER: any;
  @Input() UserD: EventEmitter<any> = new EventEmitter();
  
  constructor(
    public toaster: ToastrService,
    public userService: UsersService,
    public modal: NgbActiveModal, 
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.userService.remove(this.USER._id).subscribe((resp:any) => {
      console.log(resp);
      this.UserD.emit('');
      this.modal.close();
      this.toaster.success('USUARIO ELIMINADO EXITOSAMENTE ', 'VALIDACIONES');
    })

  }

  

}
