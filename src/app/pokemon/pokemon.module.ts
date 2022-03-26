import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared/shared.module';

import { PokemonRoutingModule } from '@pokemon/pokemon-routing.module';
import { EditComponent } from '@pokemon/edit/edit.component';
import { ListComponent } from '@pokemon/list/list.component';

@NgModule({
  declarations: [EditComponent, ListComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbTooltipModule,
  ],
  exports: [ListComponent],
})
export class PokemonModule {}
