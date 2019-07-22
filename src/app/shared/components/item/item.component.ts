import { Input, Component, ChangeDetectionStrategy } from '@angular/core';

// SERVICES
import { GoogleAnalyticsService } from '../../services';

// DOM
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class ItemComponent {
	@Input() public productID: number;
	@Input() public cat: string;
	@Input() public upc: number;
	@Input() public name: string;
	@Input() public Hprice: number;
	@Input() public Lprice: number;
	@Input() public images: string;
	@Input() public brands: string;
	@Input() public rating: number;
	@Input() public ratingC: number;

	noImage: string;

	constructor(
		public GS: GoogleAnalyticsService,
		private sanitizer: DomSanitizer
	) {
		this.noImage = require('../../../../assets/img/no-thumbnail.jpg');
	}

	product(i) {
		if (i) {
			return i.toString().toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-{2,}/g, '-')
		}
	}

	gEvent() {
		this.GS.event('box', `${this.cat} - ${this.name} (${this.productID})`, 'click', 1);
	}
}
