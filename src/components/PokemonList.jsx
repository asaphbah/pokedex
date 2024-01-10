import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/pokemonList.css";
import Pokemon from "./Pokemon";

const PokemonList = ({ pokemonArray, pokemonListTypes }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [pageInicial, setPagInicial] = useState(0);
  const [pageFinal, setPagFinal] = useState(20);
  const PAGE_ATUAL = Math.ceil(pageFinal / 20);
  const PAGE_MAX = Math.ceil(pokemonList.length / 20);

  useEffect(() => {
    setPokemonList(pokemonArray);
  }, [pokemonArray]);

  const renderPokemon = () => {
    const limitedList = Page();
    return limitedList.map((pokemon, index) => {
      return <Pokemon key={index} data={pokemon} />;
    });
  };

  const searchPokemonName = () => {
    setPagInicial(0);
    setPagFinal(20);
    const filterList = pokemonArray.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setPokemonList(filterList);
  };
  const searchPokemonType = () => {
    setPagInicial(0);
    setPagFinal(20);
    pokemonListTypes(typeFilter);
  };
  const searchText = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
  };

  const resetFilters = () => {
    setPagInicial(0);
    setPagFinal(20);
    setSearchTerm("");
    setTypeFilter("All");
    pokemonListTypes("all");
  };
  const PageAlternateAfter = (pageNumber) => {
    const nextPageInicial = (pageNumber - 1) * 20;
    const nextPageFinal = pageNumber * 20;
    setPagInicial(nextPageInicial);
    setPagFinal(nextPageFinal);
  };
  const Page = () => {
    const limitedList = pokemonList.slice(pageInicial, pageFinal);
    return limitedList;
  };
  const PageView = () => {
    const MAX_PAGES_DISPLAYED = 5; 
    const totalPages = PAGE_MAX; 

    let startPage = 1;
    if (totalPages > MAX_PAGES_DISPLAYED) {
      startPage = Math.max(
        Math.min(
          PAGE_ATUAL - Math.floor(MAX_PAGES_DISPLAYED / 2),
          totalPages - MAX_PAGES_DISPLAYED + 1
        ),
        1
      );
    }

    const pages = Array.from(
      { length: Math.min(MAX_PAGES_DISPLAYED, totalPages) },
      (_, index) => {
        const pageNumber = startPage + index;

        return (
          <li
            key={pageNumber}
            className={pageNumber === PAGE_ATUAL ? "active" : ""}
          >
            <button
              className="btn-pg"
              onClick={() => PageAlternateAfter(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        );
      }
    );

    return <ul className="pagination">{pages}</ul>;
  };

  return (
    <div className="body-list">
      <span>
        <span></span>
      </span>
      <div className="list-filter">
        <div className="search-type">
          <select value={typeFilter} onChange={handleTypeFilter}>
            <option value="All">All</option>
            <option value="Normal">Normal</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Electric">Electric</option>
            <option value="Ice">Ice</option>
            <option value="Fighting">Fighting</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Flying">Flying</option>
            <option value="Psychic">Psychic</option>
            <option value="Bug">Bug</option>
            <option value="Rock">Rock</option>
            <option value="Ghost">Ghost</option>
            <option value="Dragon">Dragon</option>
            <option value="Steel">Steel</option>
            <option value="Dark">Dark</option>
            <option value="Fairy">Fairy</option>
          </select>
          <button className="btn" onClick={searchPokemonType}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="menu-search">
          <div className="search-pokemon">
            <input
              type="text"
              placeholder="   Search..."
              onChange={searchText}
            />
          </div>

          <button className="btn" onClick={searchPokemonName}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <button className="btn" onClick={resetFilters}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>

      <PageView />
      <ul className="list-pokemon">{renderPokemon()}</ul>
    </div>
  );
};
export default PokemonList;
