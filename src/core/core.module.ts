import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared';
import { AuthService } from './services';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
    imports: [CommonModule, RouterModule, SharedModule],
    providers: [AuthService],
    declarations: [HeaderComponent, NavigationComponent],
    exports: [HeaderComponent],
})
export class CoreModule {}
