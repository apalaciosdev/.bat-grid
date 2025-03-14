import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  standalone: true,
  templateUrl: './terminal.component.html',
  imports: [FormsModule]
})

export class TerminalComponent {
  @Input() data: any;

  inputCommand: string = '';

  executeCommand() {
    if (this.inputCommand.trim()) {
      this.data.gridCommands[this.data.gridSelected].push(this.inputCommand);
      this.inputCommand = '';
      setTimeout(() => this.scrollToBottom(), 50); 
    }
  }

  private scrollToBottom() {
    const historyElement = document.getElementById('history');
    if (historyElement) {
      historyElement.scrollTop = historyElement.scrollHeight;
    }
  }
}
