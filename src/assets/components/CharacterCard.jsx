import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterCard = ({url}) => {

    const [ character, setChatacter ] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(url)
        .then(res => setChatacter(res.data));
    }, [])

    console.log('___',character)
    return (
        <div className="pokemons-container" onClick={() => navigate(`/characters/${character.id}`)}>
            <h3>{character.name}</h3>
            <img src={character.sprites?.front_default || character.sprites?.front_shiny }/>
            <h6>Height: {character.height}</h6>
            <h6>Weight: {character.weight}</h6>
        </div>
    );
};

export default CharacterCard;