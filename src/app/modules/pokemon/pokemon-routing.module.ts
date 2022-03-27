import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { ListComponent } from '@modules/pokemon/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule {
}
