import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";
import { LayoutType } from '../../shared/models/layout.model';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-layout-selector',
  standalone: true,
  templateUrl: './layout-selector.component.html',
  imports: [LayoutComponent, ModalComponent]
})

export class LayoutSelectorComponent {
  get layoutTypes() {
    return Object.values(LayoutType);
  }

  constructor(private modalService: ModalService) { }

  
  layoutType = LayoutType;
  
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(){
    this.modalService.close();
  }

  selectLayout(layout: any) {
    console.log('Selected layout:', layout);
    this.modalService.close();
  }
}
