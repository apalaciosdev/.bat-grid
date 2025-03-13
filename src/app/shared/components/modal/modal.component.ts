import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';



@Component({
	selector: 'vn-modal',
	templateUrl: './modal.component.html',
	imports: [NgClass],
	standalone: true
})
export class ModalComponent implements OnInit, OnDestroy {

	@Input() id!: string;
	@Input() title!: string;
	@Input() large!: boolean;
	@Input() closeable!: boolean;
	private element: HTMLElement;
	constructor(public modalService: ModalService, private el: ElementRef, private cd: ChangeDetectorRef) {
		this.element = el.nativeElement;
	}

	ngOnInit(): void {
		// Nos aseguramos de que tenga un ID
		if (!this.id) {
			console.error('modal must have an id');
			return;
		}
		// Es mou l'element al final de la pagina (just abans del tancament del body), 
		// per que pugui ser mostrat damunt de tot

		this.modalService.add(this);
	}

	ngOnDestroy(): void {
		this.modalService.remove(this.id);
		this.element.remove();
	}

	open(): void {
		this.cd.detectChanges();
		document.body.appendChild(this.element);
		this.element.style.display = 'block';
		document.body.classList.add('modal-open');
	}

	close(): void {
		this.element.style.display = 'none';
		document.body.classList.remove('modal-open');
		this.element.remove();
	}

}
