import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import CharacterCard from './CharacterCard';

const Characters = () => {

  const name = useSelector(state => state.userName)

  const [ charactersList, setCharactersList ] = useState([]);
  const [ nameInput, setNameInput ] = useState("");
  const [ pokemonType, setPokemonType ] = useState([]);
  

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/`)
      .then(res => setCharactersList(res.data.results));

    axios.get(`https://pokeapi.co/api/v2/type/`)
    .then(res => setPokemonType(res.data.results));

  }, [])

  // console.log(pokemonType);
  // console.log(charactersList)

  const searchName = () => {
    navigate(`/characters/${nameInput}`)
  }

  const searchPokemonType = (typeUrl) => {
    axios.get(typeUrl)
      .then(res => setCharactersList(res.data.pokemon));
  }

//paginacion

  const [page, setPage] = useState(1);


  const [pagesPerCharacter, setPagesPerCharacter] = useState(4)
  const lastCharacterIndex = page * pagesPerCharacter
  const firtsCharacterIndex = lastCharacterIndex - pagesPerCharacter;
  const charactersPaginated = charactersList.slice(
    firtsCharacterIndex,
    lastCharacterIndex);

    const totalPages = Math.ceil(charactersList.length / pagesPerCharacter)
    const pagesNumbers = [];
    for ( let i = 1; i <= totalPages; i++) {
      pagesNumbers.push(i);
    }

    
    const exit = () => {
      navigate("/");
  }

// console.log(pagesPerCharacter);
  

  return (
    <div className='characterIntro'>
      <h1>Pokedex
        <button type="button" class="btn btn-danger" onClick={exit}>Exit</button> </h1>
      <p>Welcome {name}, <br/>
        please choose your pokemon
      </p>
      <div>
        <input 
        type="text" 
        placeholder='Search by name'
        value={nameInput}
        onChange={e => setNameInput(e.target.value)}
        />
        <button onClick={searchName}>Search</button>        
      </div>
      <button
          onClick={() => setPage(page-1)}
          disabled={page === 1}
      >
        Prev Page
      </button>
      {
          pagesNumbers.map(number =>(
            <button onClick={() => setPage(number)}>{number}</button>
          ))
      }
      <button
          onClick={() => setPage(page+1)}
          disabled={page === totalPages}
          >
          Next Page
      </button>
      <div>
          <select onChange= {e => setPagesPerCharacter(e.target.value)}>
           { [4,8,12,16,20].map((p, index) => (
            <option key={index} value={p}>{p}</option>            
            ))}
          </select>
        <select onChange= {e => searchPokemonType(e.target.value)}>
          <option value="">Choose by type</option>
          {pokemonType.map(type =>(
            <option value={type.url} key={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className='cardsContainer'>
      <div className='initialCards'>
      {
        charactersPaginated.map(character => (
          <CharacterCard 
              url={character.url ? character.url : character.pokemon.url} 
              key={character.url ? character.url : character.pokemon.url}/>
        ))
      }
      </div>
      </div>
    </div>
  );
};

export default Characters;
