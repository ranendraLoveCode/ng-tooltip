import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TooltipOptions } from './tooltip-options.interface';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements OnInit {
  @ViewChild('tooltipContainer', { read: ElementRef })
  private tooltipContainer!: ElementRef;
  constructor(
    private renderer: Renderer2,
    @Inject('tooltipOptions') public tooltipOptions: TooltipOptions
  ) {}

  ngOnInit() {
    setTimeout(() => {
      const tooltipContainerElement = this.tooltipContainer.nativeElement;
      const offset = 4;
      const hostPosition = this.tooltipOptions.host.getBoundingClientRect();
      const tooltipPosition = tooltipContainerElement.getBoundingClientRect();
      let top, left;
      switch (this.tooltipOptions.placement) {
        case 'top':
          top = hostPosition.top - tooltipPosition.height - offset;
          left =
            hostPosition.left +
            (hostPosition.width - tooltipPosition.width) / 2;
          break;
        case 'bottom':
          top = hostPosition.bottom + offset;
          left =
            hostPosition.left +
            (hostPosition.width - tooltipPosition.width) / 2;
          break;
        case 'left':
          top =
            hostPosition.top +
            (hostPosition.height - tooltipPosition.height) / 2;
          left = hostPosition.left - tooltipPosition.width - offset;
          break;
        case 'right':
          top =
            hostPosition.top +
            (hostPosition.height - tooltipPosition.height) / 2;
          left = hostPosition.right + offset;
          break;
        default:
          if (
            tooltipPosition.height + hostPosition.height <
              this.tooltipOptions.mouseEvent.y &&
            tooltipPosition.width < this.tooltipOptions.mouseEvent.x &&
            tooltipPosition.width + this.tooltipOptions.mouseEvent.x <
              window.innerWidth
          ) {
            //top
            top = hostPosition.top - tooltipPosition.height - offset;
            left =
              hostPosition.left +
              (hostPosition.width - tooltipPosition.width) / 2;
          } else if (
            tooltipPosition.height + hostPosition.height >
              this.tooltipOptions.mouseEvent.y &&
            tooltipPosition.width <
              hostPosition.left +
                hostPosition.width +
                this.tooltipOptions.mouseEvent.x
          ) {
            //bottom
            top = hostPosition.bottom + offset;
            left =
              hostPosition.left +
              (hostPosition.width - tooltipPosition.width) / 2;
          } else if (
            tooltipPosition.width + hostPosition.width <
            this.tooltipOptions.mouseEvent.x
          ) {
            //left
            top =
              hostPosition.top +
              (hostPosition.height - tooltipPosition.height) / 2;
            left = hostPosition.left - tooltipPosition.width - offset;
          } else if (
            (hostPosition.bottom + tooltipPosition.height >
              window.innerHeight &&
              tooltipPosition.height < hostPosition.top) ||
            tooltipPosition.width + hostPosition.width >
              window.innerWidth - hostPosition.right
          ) {
            //top
            top =
              Math.sign(hostPosition.top - tooltipPosition.height - offset) !==
              -1
                ? hostPosition.top - tooltipPosition.height - offset
                : 20;
            left = 20;
          } else {
            //right
            top =
              hostPosition.top +
              (hostPosition.height - tooltipPosition.height) / 2;
            left = hostPosition.right + offset;
          }
      }
      this.tooltipOptions.customClass
        ? this.renderer.addClass(
            tooltipContainerElement,
            this.tooltipOptions.customClass
          )
        : null;
      this.renderer.setStyle(tooltipContainerElement, 'top', `${top}px`);
      this.renderer.setStyle(tooltipContainerElement, 'left', `${left}px`);
    });
  }
}
