import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';

import { Pokemon } from '@shared/interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private crudService: CrudService) {}

  /***
   * Obtener Pokemons
   */
  getPokemons(author: number): Observable<Pokemon[]> {
    return this.crudService.get(`pokemons/?idAuthor=${author}`, {});
  }

  /***
   * Obtener Pokemon - Por Identificador
   * @param idPokemon Identificador Pokemon
   * @constructor
   */
  getPokemonById(idPokemon: number): Observable<Pokemon> {
    return this.crudService.get(`pokemons/${idPokemon}`);
  }

  /***
   * Crear Pokemon
   * @param data Datos Pokemon
   * @constructor
   */
  createPokemon(data: Pokemon, author: number) {
    return this.crudService.post(`pokemons/?idAuthor=${author}`, data);
  }

  /***
   * Actualizar Pokemon
   * @param idPokemon Identificador Pokemon
   * @param data Datos Pokemon
   * @constructor
   */
  updatePokemon(idPokemon: number, data: Pokemon) {
    return this.crudService.put(`pokemons/${idPokemon}`, data);
  }

  /***
   * Eliminar Pokemon
   * @param idPokemon Identificador Pokemon
   * @constructor
   */
  deletePokemon(idPokemon: number) {
    return this.crudService.delete(`pokemons/${idPokemon}`);
  }

  getTypePokemon(): string[] {
    return ['water', 'fire', 'normal', 'bug', 'poison'];
  }
}
