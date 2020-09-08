
import axios from 'axios';

export type Ability = {
    ability: string;
}

export type Pokemon = {
    name: string;
    abilities: string[];
    base_experience: number;
    height: number;
    weight: number;
    sprite_url: string;
}

const pokeAPI = axios.create({
    baseURL: `https://pokeapi.co/api/v2/pokemon`
})

export const fetchPokemonInfo = async (pokemon: string) => {
    console.log("Fecthing pokemon info for " + pokemon);

    let pokemoninfo:Pokemon|null = await pokeAPI.get(`/${pokemon}`).then(res => {
        console.log(res.data);
        return {
            name: res.data.name,
            abilities: res.data.abilities.map((ab:any) => ab.ability.name),
            base_experience: res.data.base_experience,
            height: res.data.height,
            weight: res.data.weight,
            sprite_url: res.data.sprites.front_default
        };
    }).catch(
        err => {
            console.log("Error fetching pokemon info" + err);
            return null;            
        }
    );

    console.log("After await: ");
    return pokemoninfo;
}


