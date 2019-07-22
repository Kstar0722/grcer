import {
	Component, OnInit
} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'cart-modal',
	templateUrl: 'cart-modal.component.html',
})
export class CartModalComponent implements OnInit {
	title: string;
	closeBtnName: string;
	list: any[] = [];
	productID: number;

	constructor(public bsModalRef: BsModalRef) { }

	ngOnInit() {
	}

	resetCartListModal() {
		this.bsModalRef.hide();
	}

	removeCurrentModal(data) {
		if (!data) {
			this.resetCartListModal();
		}
	}
}
