import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipOptions } from './tooltip-options.interface';

@Directive({
  selector: '[tooltip]',
  exportAs: 'tooltip',
})
export class TooltipDirective implements OnDestroy {
  @Input('tooltip') content!: string | TemplateRef<any> | Type<any>;
  @Input() placement!: string;
  @Input() tooltipClass!: string;
  private componentRef!: ComponentRef<TooltipComponent>;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    if (this.componentRef) return;
    const tooltipOptionsValue: TooltipOptions = {
      host: this.element.nativeElement,
      placement: this.placement,
      mouseEvent: event,
      customClass: this.tooltipClass,
    };
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = Injector.create({
      providers: [
        {
          provide: 'tooltipOptions',
          useValue: tooltipOptionsValue,
        },
      ],
    });
    this.componentRef = this.viewContainerRef.createComponent(
      factory,
      0,
      injector,
      this.generateNgContent()
    );

    this.componentRef ? this.appendComponentToBody(this.componentRef) : null;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.onClear();
  }

  private appendComponentToBody = (componentRef: ComponentRef<any>) => {
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  };

  generateNgContent() {
    if (typeof this.content === 'string') {
      const element = this.renderer.createText(this.content);
      return [[element]];
    }

    if (this.content instanceof TemplateRef) {
      const viewRef = this.content.createEmbeddedView({});
      return [viewRef.rootNodes];
    }

    if (this.content) {
      const factory = this.resolver.resolveComponentFactory(this.content);
      const viewRef = factory.create(this.injector);
      return [[viewRef.location.nativeElement]];
    }
    return;
  }

  onClear() {
    this.componentRef && this.componentRef.destroy();
  }

  ngOnDestroy() {
    this.onClear();
  }
}
