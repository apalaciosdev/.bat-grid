import { Component } from '@angular/core';
import { LogoComponent } from "./components/logo/logo.component";
import { LayoutType } from './shared/models/layout.model';
import { LayoutSelectorComponent } from "./components/layout-selector/layout-selector.component";
import { CommonModule } from '@angular/common';
import { TerminalComponent } from "./components/terminal/terminal.component";
import { BatService } from './shared/services/bat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [LogoComponent, LayoutSelectorComponent, CommonModule, TerminalComponent]
})

export class AppComponent {
  layoutType = LayoutType;

  data = {
    layout: LayoutType.ONE_LEFT_TWO_RIGHT,
    gridCommands: [[], [], []],
    gridSelected: 1
  }

  constructor(public batService: BatService) {}
}
