import { Component } from '@angular/core';
import { DiscountService } from '../service/discount.service';
import { DiscountDeleteComponent } from '../discount-delete/discount-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss']
})
export class DiscountListComponent {
  DISCOUNTS:any = [];
  state:any= 1;
  isLoading: any;
  categorie: string = '';
 
  CATEGORIES: any = [];

  constructor(
    public discountService: DiscountService,
    private modalService: NgbModal,
    public datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.isLoading = this.discountService.isLoading$;
    this.listDiscount()
  }


  listDiscount() {
    this.discountService.listDiscounts().subscribe((resp: any) => {
      console.log(resp);
      this.DISCOUNTS = resp.discounts;
    })
  }
getTypeCampaign(type_campaign: number)
{
  let response = '';
  switch (type_campaign) {
    case 1:
      response = 'CAMPAÑA NORMAL';

        break;
    case 2:
      response = 'CAMPAÑA FLASH'
      break;

    case 3:
      response = 'CAMPAÑA BANNER'
      break;
  
    default:
      break;
  }
return response;
}

getParseDate(date:any){
  return this.datePipe.transform(date, 'dd/MM/yyyy', 'UTC');
}
  deleteDiscount(DISCOUNT:any){
    const modalRef = this.modalService.open(DiscountDeleteComponent, { size: 'md' });
    modalRef.componentInstance.DISCOUNT = DISCOUNT;
    modalRef.componentInstance.DISCOUNTD.subscribe((val: any) => {
      let INDEX = this.DISCOUNTS.findIndex((item: any) => item._id === DISCOUNT._id);
      if (INDEX  != -1) {
        this.DISCOUNTS.splice(INDEX, 1);
      }
    })
  }
}
