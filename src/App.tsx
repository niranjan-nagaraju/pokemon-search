import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';

import {SearchBox} from './components/search';
import {PokemonCard} from './components/pokemon_card';
import {Pokemon,  fetchPokemonInfo} from './poke_api';

import CSS from 'csstype';

/** Top header bar - CSS */
const headerStyle:CSS.Properties = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '2px'
}

export class App extends Component {
  state = {
    error: false,
    search_key: '',
    pokemon: {
      name: '',
      base_experience: 0,
      height: 0,
      weight: 0,
      sprite_url: '',
      abilities: []
    },
  }

  /** Callback from the search-box when the form is submitted */
  searchCallback = async (searchString: string) => {
    this.setState({search_key: searchString});
    this.setState({error: false});
    this.setState({pokemon: {name: ''}});

    if (searchString.length === 0) {
      this.setState({error: true});
      return;
    }

    console.log("searching for: " + searchString);

    let pokemonInfo:Pokemon|null = await fetchPokemonInfo(searchString.toLowerCase());

    if (pokemonInfo === null) {
      this.setState({error: true});
      return;
    }
    this.setState({error: false});

    console.log('pokemon info: ' + (pokemonInfo !== null ? pokemonInfo.abilities: "null"));
    console.log('pokemon info: ' + (pokemonInfo !== null ? pokemonInfo.name: "null"));

    this.setState({pokemon: pokemonInfo});
    console.log('pokemon state: ' + this.state.pokemon.name);

  }

  render() {
    return (
      <Container fluid className="p-3">
        <header style={headerStyle}>
          <h2 className="header text-center">
            Search for Pokemons
          </h2>
        </header>
        <div className="d-flex justify-content-center">
        <SearchBox callback={this.searchCallback} />
        </div>
        {!this.state.error && this.state.search_key.length !== 0 && this.state.pokemon.name.length !== 0 && (
          <div className="d-flex justify-content-center">
          <PokemonCard 
            key={this.state.pokemon.name}
            name={this.state.pokemon.name}
            base_experience={this.state.pokemon.base_experience}
            sprite_url={this.state.pokemon.sprite_url}
            height={this.state.pokemon.height}
            weight={this.state.pokemon.weight}
            num_abilities={this.state.pokemon.abilities}          
          />
          </div>
        )}
       {this.state.error && this.state.search_key.length !== 0 && (
          <div className="d-flex justify-content-center">
            <h5>Couldn't find Pokemon: {this.state.search_key} </h5> 
          </div>
          )}
      </Container>
    );
  }
}

export default App;
