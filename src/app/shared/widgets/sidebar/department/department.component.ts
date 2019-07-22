import { Input, Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

// SERVICES
import { CategoryService } from '../../../services';

// ROUTER
import { ActivatedRoute } from '@angular/router';

// INTERFACES
import { ICategoryFilter } from '../../../interfaces/filter/sections/category.filter.interface';

@Component({
	selector: 'department',
	templateUrl: './department.component.html',
})
export class DepartmentComponent implements OnInit, OnChanges {
	// FILTERS
	@Input() aDepartments: ICategoryFilter[] = [];

	// CATEGORIES
	sDepartments: ICategoryFilter[] = [];

	// PLACEHOLDER
	nCategories = Array(10).fill(1);

	// ROUTER
	cat: string;

	constructor(private route: ActivatedRoute, private CS: CategoryService) {
		this.route.params.subscribe(params => {
			this.cat = params['cat'];
		});
	}

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['aDepartments']) {
			this.sDepartments = this.aDepartments;
		}
	}

}
