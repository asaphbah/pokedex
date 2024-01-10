import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/pokemon.css";

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (data && data.url) {
      axios.get(data.url).then((response) => {
        setDetails(response.data);
      });
    }
  }, [data]);
  const tempAnimation = () => {
    return Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "normal":
        return "#a8a878";
      case "fire":
        return "#f08030";
      case "water":
        return "#6890f0";
      case "grass":
        return "#78c850";
      case "electric":
        return "#f8d030";
      case "ice":
        return "#98d8d8";
      case "fighting":
        return "#c03028";
      case "poison":
        return "#a040a0";
      case "ground":
        return "#e0c068";
      case "flying":
        return "#a890f0";
      case "psychic":
        return "#f85888";
      case "bug":
        return "#a8b820";
      case "rock":
        return "#b8a038";
      case "ghost":
        return "#705898";
      case "dragon":
        return "#7038f8";
      case "dark":
        return "#705848";
      case "steel":
        return "#b8b8d0";
      case "fairy":
        return "#ee99ac";
      default:
        return "#ccc"; // Cor padrão para tipos desconhecidos
    }
  };
  return (
    <article className="pokemon-container">
      {details && (
        <div className={`pokemon-details `}>
          <p className={`pokemon-name `}>{details.name}</p>
          <figure
            className={`pokemon-sprites`}
            style={{
              border: `10px solid ${getTypeColor(details.types[0].type.name)}`,
            }}
          >
            <img
              style={{
                backgroundColor: getTypeColor(details.types[0].type.name),
              }}
              src={details.sprites.front_default}
              alt=""
            />
            <img
              style={{
                backgroundColor: getTypeColor(details.types[0].type.name),
                animation: `sprites-animation ${tempAnimation()}ms infinite alternate steps(2)`,
              }}
              src={details.sprites.back_default}
              alt=""
            />
          </figure>
          <div className="pokemon-type">
            {details.types.map((type, index) => (
              <p className={`${type.type.name}`} key={index}>
                {type.type.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
export default Pokemon;
