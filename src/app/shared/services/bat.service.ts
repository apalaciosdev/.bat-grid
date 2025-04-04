import { Injectable } from '@angular/core';
import { LayoutType } from '../models/layout.model';

@Injectable({
  providedIn: 'root'
})
export class BatService {

  generateBatFile(data: any): void {
    const batContent = this.generateLayout(data);

    const blob = new Blob([batContent], { type: 'text/plain' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'terminal.bat';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  generateLayout(data: any): string { 
    const commands = data.gridCommands.map((grid: string[]) => 
      grid.reduce((acc: string, command: string, index: number) => 
        acc + (index > 0 ? ' && ' : '') + command, '')
    );

    switch (data.layout) {
      case LayoutType.FOUR:
        return `
          @echo off
          start wt new-tab cmd /k "${commands[0]}" ^
          ; split-pane -V  cmd /k "${commands[2]}" ^
          ; move-focus left                        ^
          ; split-pane -H  cmd /k "${commands[1]}" ^
          ; move-focus right                       ^
          ; split-pane -H  cmd /k "${commands[3]}"
        `;
      
      case LayoutType.TWO_LEFT_ONE_RIGHT:
        return `
          @echo off
          start wt new-tab cmd /k "${commands[0]}" ^
          ; split-pane -V  cmd /k "${commands[2]}" ^
          ; move-focus left                        ^
          ; split-pane -H  cmd /k "${commands[1]}"
        `;

      case LayoutType.ONE_LEFT_TWO_RIGHT:
        return `
          @echo off
          start wt new-tab cmd /k "${commands[0]}" ^
          ; split-pane -V  cmd /k "${commands[1]}" ^
          ; move-focus right                        ^
          ; split-pane -H  cmd /k "${commands[2]}"
        `;
      
      case LayoutType.HORIZONTAL_TWO:
        return `
          @echo off
          start wt new-tab cmd /k "${commands[0]}" ^
          ; split-pane -H  cmd /k "${commands[1]}"
        `;
      
      case LayoutType.ONE_TOP_TWO_BOTTOM:
        return `
          @echo off
          start wt new-tab cmd /k "${commands[0]}" ^
          ; split-pane -H  cmd /k "${commands[1]}" ^
          ; move-focus down  ^
          ; split-pane -V cmd /k "${commands[2]}"
        `;
      
      case LayoutType.TWO_TOP_ONE_BOTTOM:
        return `
          @echo off
          start wt new-tab cmd /k "${commands[0]}" ^
          ; split-pane -H cmd /k "${commands[2]}" ^
          ; move-focus up    ^
          ; split-pane -V cmd /k "${commands[1]}"
        `;
      
      case LayoutType.VERTICAL_TWO:
        return `
          @echo off
          start wt new-tab cmd /k "${commands[0]}" ^
          ; split-pane -V cmd /k "${commands[1]}"
        `;

      case LayoutType.HORIZONTAL_TWO:
        return `
          @echo off
          start wt new-tab cmd /k "${commands[0]}" ^
          ; split-pane -H cmd /k "${commands[1]}"
        `;

      case LayoutType.SINGLE:
        return `
          @echo off
          start wt new-tab cmd /k "${commands[0]}"
        `;

      default:
        return `
          @echo off
          start wt new-tab cmd
        `;
    }
  }


}
