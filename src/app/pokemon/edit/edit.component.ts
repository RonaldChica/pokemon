import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Options } from '@angular-slider/ngx-slider';
import { Observable, of } from 'rxjs';

import { PokemonService } from '@shared/services/pokemon.service';
import { isEmpty } from '@shared/helpers/objects';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() data: any;
  @Input() titleModal: string = '';
  itemForm!: FormGroup;
  listType$!: Observable<string[]>;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
  };

  constructor(
    public activeModal: NgbActiveModal,
    private pokemonService: PokemonService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listType$ = of(this.pokemonService.getTypePokemon())
    this.itemForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      image: ['', Validators.required],
      attack: [0, [Validators.required, Validators.min(1)]],
      defense: [0, [Validators.required, Validators.min(1)]],
      hp: [0],
      idAuthor: [1, Validators.required],
      type: ['', Validators.required],
    });
    this.setData();
  }

  setData() {
    if (isEmpty(this.data)) return;

    this.pokemonService.getPokemonById(this.data.id).subscribe((pokemon) =>
      this.itemForm.patchValue({
        id: pokemon.id,
        hp: pokemon.hp,
        name: pokemon.name,
        image: pokemon.image,
        attack: pokemon.attack,
        defense: pokemon.defense,
        type: pokemon.type,
      })
    );
  }

  submitForm() {
    this.activeModal.close(this.itemForm.getRawValue());
  }
}
