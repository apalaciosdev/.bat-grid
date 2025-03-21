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
    a.download = 'start_terminal.bat';

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

      default:
        return `
          @echo off
          start wt new-tab cmd /k "cd C:\Downloads && dir" ^
          ; split-pane -V  cmd /k "cd /d C:\Users\Dev\Downloads"         ^
          ; move-focus left                                       ^
          ; split-pane -H  cmd /k "cd /d C:\Users\Dev\Downloads"      ^
          ; move-focus right                                      ^
          ; split-pane -H  cmd /k "cd /d C:\Users\Dev\Downloads"
        `;
    }
  }


}
