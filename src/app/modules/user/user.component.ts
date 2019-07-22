import { Component, OnInit } from '@angular/core';

// SERVICES
import { AuthService, API, LocalStorage } from '../../shared/services';

@Component({
	moduleId: module.id,
	selector: 'user',
	templateUrl: 'user.component.html'
})

export class UserComponent {
	constructor(private AS: AuthService, private A: API, private LS: LocalStorage) {
	}
}
