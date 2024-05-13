import { Component, EventEmitter, Input } from '@angular/core';
import { DiscountService } from '../service/discount.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-discount-delete',
  templateUrl: './discount-delete.component.html',
  styleUrls: ['./discount-delete.component.scss']
})
export class DiscountDeleteComponent {
  @Input() DISCOUNT: any;
  @Input() DISCOUNTD: EventEmitter<any> = new EventEmitter();

  constructor(
    public discountService: DiscountService,
    public toaster: ToastrService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

delete(){
  this.discountService.removeDiscount(this.DISCOUNT._id).subscribe((resp: any) => {
    console.log(resp);
    if(resp.code === 403 ){
      this.toaster.error(resp.message, 'NO SE PUDO ELIMINAR EL DESCUENTO');
    }else{
    this.DISCOUNTD.emit('');
    this.modal.close();
    this.toaster.success('DESCUENTO ELIMINADA EXITOSAMENTE ', 'VALIDACIONES');
    }
  });
}




}
 