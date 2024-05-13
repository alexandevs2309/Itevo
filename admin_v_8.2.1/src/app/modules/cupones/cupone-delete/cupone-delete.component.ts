import { Component, EventEmitter, Input } from '@angular/core';
import { CuponesService } from '../service/cupones.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cupone-delete',
  templateUrl: './cupone-delete.component.html',
  styleUrls: ['./cupone-delete.component.scss']
})
export class CuponeDeleteComponent {
  @Input() CUPON: any;
  @Input() CUPOND: EventEmitter<any> = new EventEmitter();

  constructor(
    public cuponeService: CuponesService,
    public toaster: ToastrService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

delete(){
  this.cuponeService.removeCupone(this.CUPON._id).subscribe((resp: any) => {
    console.log(resp);
    if(resp.code === 403 ){
      this.toaster.error(resp.message, 'NO SE PUDO ELIMINAR EL CUPON');
    }else{
    this.CUPOND.emit('');
    this.modal.close();
    this.toaster.success('CUPON ELIMINADA EXITOSAMENTE ', 'VALIDACIONES');
    }
  });
}




}
