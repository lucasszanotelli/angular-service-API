import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

type PokemonApiResponse = {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    types: Array<{ type: { name: string } }>;
    abilities: Array<{ ability: { name: string } }>;
    stats: Array<{ base_stat: number; stat: { name: string } }>;
    sprites: {
        front_default: string | null;
        other?: {
            'official-artwork'?: {
                front_default: string | null;
            };
        };
    };
};

export type PokemonStatView = {
    name: string;
    label: string;
    value: number;
    percent: number;
};

export type PokemonView = {
    id: number;
    name: string;
    height: string;
    weight: string;
    baseExperience: number;
    image: string;
    types: string[];
    abilities: string[];
    stats: PokemonStatView[];
};

const STAT_MAX = 180;

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private readonly http = inject(HttpClient);

    getPokemon(query: string): Observable<PokemonView> {
        const normalized = query.trim().toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(normalized)}`;

        return this.http.get<PokemonApiResponse>(url).pipe(
            map((response) => this.toView(response))
        );
    }

    private toView(response: PokemonApiResponse): PokemonView {
        const image =
            response.sprites.other?.['official-artwork']?.front_default ||
            response.sprites.front_default ||
            '';

        return {
            id: response.id,
            name: this.formatName(response.name),
            height: `${(response.height / 10).toFixed(1)} m`,
            weight: `${(response.weight / 10).toFixed(1)} kg`,
            baseExperience: response.base_experience,
            image,
            types: response.types.map((item) => this.formatName(item.type.name)),
            abilities: response.abilities.map((item) => this.formatName(item.ability.name)),
            stats: response.stats.map((item) => ({
                name: item.stat.name,
                label: this.formatStatLabel(item.stat.name),
                value: item.base_stat,
                percent: Math.min(100, Math.round((item.base_stat / STAT_MAX) * 100))
            }))
        };
    }

    private formatName(value: string): string {
        return value
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    private formatStatLabel(value: string): string {
        const map: Record<string, string> = {
            hp: 'HP',
            attack: 'Ataque',
            defense: 'Defesa',
            'special-attack': 'Ataque Esp',
            'special-defense': 'Defesa Esp',
            speed: 'Velocidade'
        };

        return map[value] ?? this.formatName(value);
    }
}
