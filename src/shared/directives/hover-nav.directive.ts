import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

const hoverBackgroundColor = '#dddddd';

const defaultBackgroundColor = '#ffffff';

@Directive({
    selector: '[appHoverNav]',
})
export class HoverNavDirective {
    constructor(private el: ElementRef, private rend: Renderer2) {}

    @HostListener('mouseenter') onMouseEnter() {
        this.rend.setStyle(this.el.nativeElement, 'backgroundColor', hoverBackgroundColor);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.rend.setStyle(this.el.nativeElement, 'backgroundColor', defaultBackgroundColor);
    }
}
