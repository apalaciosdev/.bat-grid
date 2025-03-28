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
		this.modals.push(modal);
	}

	public remove(id: string) {
		this.modals = this.modals.filter(x => x.id !== id);
		this.modalObert = false
	}

	public open(id: string) {
		const modal: ModalComponent = this.modals.filter(x => x.id === id)[0];

		if (this.enabledModals.length > 0) {
			this.enabledModals[this.enabledModals.length - 1].close();
		}
		if (this.enabledModals.indexOf(modal) === -1) {
			this.enabledModals.push(modal);
		}
		this.modalObert = true;

		modal.open();
	}

	public closeById(id: string) {
		const modal: ModalComponent = this.modals.filter(x => x.id === id)[0];
		modal.close();
		this.enabledModals.pop();
		if (this.enabledModals.length > 0) {
			this.open(this.enabledModals[this.enabledModals.length - 1].id);
		}
		this.modalObert = false
	}

	public close() {
		this.closeById(this.enabledModals[this.enabledModals.length - 1].id);
	}

}
