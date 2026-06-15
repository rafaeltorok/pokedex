const kantoPokedex = {
  region: "Kanto",
  displayName: "Gen I - Kanto",
  dataUrl: "https://pokeapi.co/api/v2/pokemon/?limit=151"
};

const johtoPokedex = {
  region: "Johto",
  displayName: "Gen II - Johto",
  dataUrl: "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100"
};

const hoennPokedex = {
  region: "Hoenn",
  displayName: "Gen III - Hoenn",
  dataUrl: "https://pokeapi.co/api/v2/pokemon?offset=251&limit=135"
};

const sinnohPokedex = {
  region: "Sinnoh",
  displayName: "Gen IV - Sinnoh",
  dataUrl: "https://pokeapi.co/api/v2/pokemon?offset=386&limit=107"
};

const pokedexGenList = [
  kantoPokedex,
  johtoPokedex,
  hoennPokedex,
  sinnohPokedex
];

export default pokedexGenList;
