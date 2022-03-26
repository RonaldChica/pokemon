import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IcofontComponent } from '@shared/components/icofont/iconfont.component';

@NgModule({
  declarations: [IcofontComponent],
  imports: [CommonModule],
  exports: [IcofontComponent],
})
export class SharedModule {}
