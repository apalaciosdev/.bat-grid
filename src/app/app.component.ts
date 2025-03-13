import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from "./components/logo/logo.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { LayoutType } from './shared/models/layout.model';
import { LayoutSelectorComponent } from "./components/layout-selector/layout-selector.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [LogoComponent, LayoutComponent, LayoutSelectorComponent]
})

export class AppComponent {
  layoutType = LayoutType;
}
