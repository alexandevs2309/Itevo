import { Component } from '@angular/core';
import { CuponesService } from '../service/cupones.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CuponeDeleteComponent } from '../cupone-delete/cupone-delete.component';

@Component({
  selector: 'app-cupone-list',
  templateUrl: './cupone-list.component.html',
  styleUrls: ['./cupone-list.component.scss']
})
export class CuponeListComponent {
  search: string = '';
  state: string = '';
  isLoading: any;
  categorie: string = '';
  CUPONES: any = [];
 
  CATEGORIES: any = [];

  constructor(
    public cuponesService: CuponesService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.isLoading = this.cuponesService.isLoading$;
    this.listCupones()
  }


  listCupones() {
    this.cuponesService.listCupone(this.search, this.state).subscribe((resp: any) => {
      console.log(resp);
      this.CUPONES = resp.cupones;
    })
  }

  deleteCupon(CUPON:any){
    const modalRef = this.modalService.open(CuponeDeleteComponent, { size: 'md' });
    modalRef.componentInstance.CUPON = CUPON;
    modalRef.componentInstance.CUPOND.subscribe((val: any) => {
      let INDEX = this.CUPONES.findIndex((item: any) => item._id === CUPON._id);
      if (INDEX  != -1) {
        this.CUPONES.splice(INDEX, 1);
      }
    })
  }
}
