import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

	private modals: ModalComponent[] = [];
	public enabledModals: ModalComponent[] = [];
	public modalObert: boolean = false;

	public get activa() {
		return this.enabledModals.length > 0 ? this.enabledModals[this.enabledModals.length - 1] : undefined;
	}

	public add(modal: ModalComponent) {
		// add modal to array of active modals
		this.modals.push(modal);
	}

	public remove(id: string) {
		// remove modal from array of active modals
		this.modals = this.modals.filter(x => x.id !== id);
		this.modalObert = false
	}

	public open(id: string) {
		const modal: ModalComponent = this.modals.filter(x => x.id === id)[0];
		// Si existen modales habilitadas
		if (this.enabledModals.length > 0) {
			// Cerramos la anterior
			this.enabledModals[this.enabledModals.length - 1].close();
		}
		if (this.enabledModals.indexOf(modal) === -1) {
			// Agregamos la nueva
			this.enabledModals.push(modal);
		}
		this.modalObert = true;
		// Abrimos la nueva
		modal.open();
	}

	public closeById(id: string) {
		// Cerrar modal por ID, la activa es la ultima del array
		const modal: ModalComponent = this.modals.filter(x => x.id === id)[0];
		modal.close();
		this.enabledModals.pop();
		if (this.enabledModals.length > 0) {
			// Si queda alguna modal en el array, la abrimos
			this.open(this.enabledModals[this.enabledModals.length - 1].id);
		}
		this.modalObert = false
	}

	public close() {
		this.closeById(this.enabledModals[this.enabledModals.length - 1].id);
	}

}
