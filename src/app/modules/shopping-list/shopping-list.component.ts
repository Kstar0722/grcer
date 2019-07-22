import { Component, OnInit, ViewChild } from '@angular/core';

// SERVICES
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'shopping-list',
	templateUrl: 'shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {

	constructor(public router: Router) {
	}

	ngOnInit() {}

}
