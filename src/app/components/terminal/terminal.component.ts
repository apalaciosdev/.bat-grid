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
  editMode = {status: false, index: 0};

  executeCommand() {
    if (this.inputCommand.trim()) {
      if (this.editMode.status) {
        this.data.gridCommands[this.data.gridSelected][this.editMode.index] = this.inputCommand;
        this.editMode.status = false;
      } else {
        this.data.gridCommands[this.data.gridSelected].push(this.inputCommand);
      }
      
      this.inputCommand = '';
      setTimeout(() => this.scrollToBottom(), 50); 
    }
  }

  deleteCommand(index: number) {
    this.data.gridCommands[this.data.gridSelected].splice(index, 1);
  }

  editCommand(indexCommand: number) {
    this.inputCommand = this.data.gridCommands[this.data.gridSelected][indexCommand];
    this.editMode = {status: true, index: indexCommand};

    const inputElement = document.getElementById('inputCommand') as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }

  private scrollToBottom() {
    const historyElement = document.getElementById('history');
    if (historyElement) {
      historyElement.scrollTop = historyElement.scrollHeight;
    }
  }
}
