import { Component, Input } from '@angular/core';
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
  @Input() data: any = {};

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
    this.data.layout = layout
    this.data.gridSelected = 0;

    switch (layout) {
      case LayoutType.SINGLE:
        this.data.gridCommands = [[]];
        break

      case LayoutType.HORIZONTAL_TWO:
      case LayoutType.VERTICAL_TWO:
        this.data.gridCommands = [[], []];
        break;

      case LayoutType.ONE_TOP_TWO_BOTTOM:
      case LayoutType.TWO_TOP_ONE_BOTTOM:
      case LayoutType.ONE_LEFT_TWO_RIGHT:
      case LayoutType.TWO_LEFT_ONE_RIGHT:
        this.data.gridCommands = [[], [], []];
        break;

      case LayoutType.FOUR:
        this.data.gridCommands = [[], [], [], []];
        break;
    }

    this.modalService.close();
  }
}
