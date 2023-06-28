import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
    public name = {
        firstName: 'FirstName',
        lastName: 'LastName',
    };
}
