import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, from } from 'rxjs';
import { debounceTime, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Pokemon } from '@shared/interfaces/pokemon';
import { PokemonService } from '@shared/services/pokemon.service';
import { NotificationService } from '@shared/services/notification.service';

import { EditComponent } from '@pokemon/edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  items: Pokemon[] = [];
  listItems$: Subject<string> = new Subject<string>();
  destroy$: Subject<boolean> = new Subject<boolean>();
  showLoading: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private notificationService: NotificationService,
    private ngModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.listItems$
    .pipe(
      startWith(undefined),
      tap(() => this.showLoading = true),
      debounceTime(500),
      switchMap(search => this.pokemonService.getPokemons(1)),
      takeUntil(this.destroy$),
    )
    .subscribe((listado: Pokemon[]) => {
      this.items = listado
      this.showLoading = false
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  keyUpEnter(evt: any) {
    const { value }: { value: string } = evt.target;
    console.log(value);
    this.listItems$.next(value);
  }

  setDefaultPic(row: Pokemon) {
    row.image = 'assets/img/default-pokemon.jpg';
  }

  edit(row?: Pokemon) {
    const modal = this.ngModal.open(EditComponent, {
      centered: true,
      size: 'lg',
    });
    modal.componentInstance.titleModal = row
      ? 'Editar Pokemon'
      : 'Nuevo Pokemon';
    modal.componentInstance.data = row || {};

    modal.result.then((dataModal) => {
      if (!dataModal) return;

      from(
        row
          ? this.pokemonService.updatePokemon(row.id, dataModal)
          : this.pokemonService.createPokemon(dataModal, 1)
      ).subscribe((dataOperacion) => {
        this.notificationService.showSwalMessage({
          title: 'Operación Exitosa',
          timer: 3000,
        });
      });
    });
  }

  delete(row: Pokemon) {
    this.notificationService
      .showSwalConfirm({
        title: 'Eliminar Registro',
        text: `Eliminar Pokemon: ${row.name}`,
        confirmButtonText: 'Si, eliminar registro.',
      })
      .then((resolve) => {
        if (!resolve) return;

        this.pokemonService.deletePokemon(row.id).subscribe(() => {
          this.notificationService.showSwalMessage({
            title: 'Operación Exitosa',
            timer: 3000,
          });
        });
      });
  }
}
