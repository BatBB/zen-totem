import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './services';
import { HoverNavDirective } from './directives/hover-nav.directive';

@NgModule({
    imports: [CommonModule],
    providers: [ProfileService],
    declarations: [HoverNavDirective],
    exports: [HoverNavDirective],
})
export class SharedModule {}
