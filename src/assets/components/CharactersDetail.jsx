import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom';

const CharacterDetail = () => {

  const { id } = useParams();
  const [ character, setCharacter ] = useState({});
  const [ types, setTypes] = useState({});
  const [ moves, setMoves ] = useState({});

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => setCharacter(res.data));
  
  }, [])

 
  console.log(moves);

  const navigate = useNavigate();
  const back = () => {
    navigate("/characters");
}


  console.log('detailed', character)
  return (
  
     character && 
       <div className="pokemon-card">
         <button type="button" class="btn btn-danger" onClick={back}>Back</button>
         <div className="infoPokemon">
         <h1>Name: <br />{character.name}</h1>
         <img src={character.sprites?.other.dream_world.front_default || character.sprites?.front_shiny}/><br/>
         <h7>id: <b> {id}</b></h7>
         <h2>Weigth: {character.weight}</h2>
         <h2>Heigth: {character.height}</h2>
         <h2>Type:
        { character.types && character.types.map((type, index) => (
          <div key={index}>{type.type.name}</div> 
        ))} </h2>
        </div>
        <h2 className="movesPokemon">Moves: { character.moves && character.moves.map((move, index) => (
          <div key={index}>{move.move.name}</div> 
        ))} </h2>
         
         
       </div>

     


  );
};

export default CharacterDetail;