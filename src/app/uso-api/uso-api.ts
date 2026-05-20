import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { PokemonService, PokemonView } from '../services/pokemon.service';

@Component({
  selector: 'app-uso-api',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './uso-api.html',
  styleUrl: './uso-api.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsoApi {
  private readonly pokemonService = inject(PokemonService);
  private readonly destroyRef = inject(DestroyRef);

  readonly form = new FormGroup({
    query: new FormControl('pikachu', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    })
  });

  readonly pokemon = signal<PokemonView | null>(null);
  readonly error = signal<string | null>(null);
  readonly isLoading = signal(false);

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    const query = this.form.controls.query.value.trim().toLowerCase();

    if (!query) {
      this.error.set('Digite um nome ou numero valido.');
      this.pokemon.set(null);
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.pokemonService
      .getPokemon(query)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (pokemon) => this.pokemon.set(pokemon),
        error: () => {
          this.pokemon.set(null);
          this.error.set('Nao encontrei esse Pokemon. Tente outro nome ou numero.');
        }
      });
  }
}
