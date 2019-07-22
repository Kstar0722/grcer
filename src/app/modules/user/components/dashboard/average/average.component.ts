import { Component } from '@angular/core';

// COMPONENT
@Component({
	moduleId: module.id,
	selector: 'dashboard-average',
	templateUrl: 'average.component.html',
})

// CLASS
export class DashboardAverageComponent {
	labels = ['Carbohydrates', 'Protein', 'Fats', 'Cholesterol', 'Sodium', 'Vitamins'];

	constructor() {
	}

	// Radar
	data: any = [
		{ data: [65, 59, 90, 81, 56, 55, 40], label: 'Total' },
		{ data: [28, 48, 40, 19, 96, 27, 100], label: 'Recommended' }
	];

	style = [
		{
			backgroundColor: 'rgba(72, 181, 106, .1)',
			borderColor: 'rgb(72, 181, 106)',
			pointBackgroundColor: 'rgb(72, 181, 106)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
		}
	]
}
