import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  entryComponents: [TooltipComponent],
  declarations: [TooltipComponent, TooltipDirective],
  imports: [],
  exports: [TooltipComponent, TooltipDirective],
})
export class TooltipModule {}
