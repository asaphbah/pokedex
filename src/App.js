import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import PokemonList from "./components/PokemonList";

function App() {
  const [list, setList] = useState([]);

  const pokemonList = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`)
      .then((response) => {
        const sortedList = response.data.results.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setList(sortedList);
      });
  };
  const pokemonListTypes = (type) => {
    if (type.toLowerCase() === "all") {
      pokemonList(); // Retorna à lista original
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`)
        .then((response) => {
          const sortedList = response.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setList(sortedList);
        });
    }
  };

  useEffect(() => {
    pokemonList();
  }, []);

  return (
    <>
      <Navbar />
      <PokemonList pokemonListTypes={pokemonListTypes} pokemonArray={list} />
    </>
  );
}

export default App;
