import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '@shared/shared.module';

import { PokemonRoutingModule } from '@modules/pokemon/pokemon-routing.module';
import { EditComponent } from '@modules/pokemon/edit/edit.component';
import { ListComponent } from '@modules/pokemon/list/list.component';

@NgModule({
  declarations: [EditComponent, ListComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbTooltipModule,
    NgxSliderModule,
    NgSelectModule
  ],
  exports: [ListComponent],
})
export class PokemonModule {}
