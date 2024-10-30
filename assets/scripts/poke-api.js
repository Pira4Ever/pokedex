const pokeApi = {
  convertPokeApiDetailToPokemon: (pokeDetail) => {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
  },
  getPokemonDetail: (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then(pokeApi.convertPokeApiDetailToPokemon);
  },
  getPokemons: (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
      .then((response) => response.json())
      .then((jsonBody) => jsonBody.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      .then((detailRequest) => Promise.all(detailRequest))
      .then((pokemonsDetails) => pokemonsDetails);
  },
};
