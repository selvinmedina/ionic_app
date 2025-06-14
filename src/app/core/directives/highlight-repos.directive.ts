import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlightRepos]',
  standalone: true,
})
export class HighlightReposDirective implements OnChanges {
  @Input() appHighlightRepos: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighlightRepos']) {
      const value = this.appHighlightRepos;
      if (value > 2) {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
      } else {
        this.renderer.removeStyle(this.el.nativeElement, 'color');
      }
    }
  }
}
