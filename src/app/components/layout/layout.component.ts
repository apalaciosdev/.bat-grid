import { Component, Input, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutType } from '../../shared/models/layout.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html'
})

export class LayoutComponent {
  @Input() data: any = {};
  @Input() selectedLayout: string = '';
  @Input() block: boolean = false

  layoutType = LayoutType;

  setGrid(grid: number) {
    this.data.gridSelected = grid;
  }
}
