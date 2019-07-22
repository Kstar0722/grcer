import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'sort',
	templateUrl: './sort.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortComponent {

	//Input
	@Input() sortBy = null;

	// OUTPUT
	@Output() sortData: EventEmitter<string> = new EventEmitter<string>();

	public sortList: Array<{ text: string, value: string }> = [
		{ text: 'Default Sorting', value: 'Product_id' },
		{ text: 'Sort by Average Rating', value: 'Rating' },
		{ text: 'Price: High to Low', value: 'Price desc' },
		{ text: 'Price: Low to High', value: 'Price' }
	];


	constructor() {
	}

	onChange(value){
		this.sortData.emit(value);
	}
}
