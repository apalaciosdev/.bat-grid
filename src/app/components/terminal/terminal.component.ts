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

  commands: string[] = []; // Almacena los comandos ingresados por el usuario
  inputCommand: string = '';

  executeCommand() {
    if (this.inputCommand.trim()) {
      this.commands.push(this.inputCommand); // Agrega el comando al historial
      this.inputCommand = ''; // Limpia el input
      setTimeout(() => this.scrollToBottom(), 50); // Desplaza el historial hacia abajo
    }
  }

  private scrollToBottom() {
    const historyElement = document.getElementById('history');
    if (historyElement) {
      historyElement.scrollTop = historyElement.scrollHeight;
    }
  }
}
