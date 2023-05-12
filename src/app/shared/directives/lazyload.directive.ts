import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import lazySizes from 'lazysizes';

@Directive({ selector: '[akaLazyload]' })
export class LazyloadDirective {
  @Input('akaLazyload') imgSrc: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initLazyLoading();
    this.setAttributes();
  }

  initLazyLoading() {
    if (lazySizes) {
      lazySizes.init();
    }
  }

  setAttributes() {
    this.renderer.addClass(this.el.nativeElement, 'lazyload');
    if (this.el.nativeElement.localName === 'img') {
      this.setImgSrc();
    } else {
      this.setElementBackgroundImage();
    }
  }

  setImgSrc() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.imgSrc);
  }

  setElementBackgroundImage() {
    this.renderer.setStyle(this.el.nativeElement, 'background-image', `url(${this.imgSrc})`);
  }
}
