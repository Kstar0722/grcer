import { Component, OnInit } from '@angular/core';

// SEO
import { Title } from '@angular/platform-browser';

// COMPONENT
@Component({
	moduleId: module.id,
	selector: 'management',
	templateUrl: 'management.component.html',
})

// CLASS
export class ManagementComponent implements OnInit {
	constructor(title: Title) {
		title.setTitle('Management - grceri');
	}

	ngOnInit() {
		// If no default value in Status input, set filter to empty array
	}


}
