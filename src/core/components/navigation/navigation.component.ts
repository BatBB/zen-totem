import { Component } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less'],
})
export class NavigationComponent {
    public navItems = [
        { title: 'Home', link: '/home' },
        { title: 'Inventory', link: '/inventory' },
        { title: 'Reports', link: '/reports' },
        { title: 'Billing', link: '/billing' },
        { title: 'Profile', link: '/profile' },
    ];
}
