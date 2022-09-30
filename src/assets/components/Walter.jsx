import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import UserInput from './UserInput';

const Walter = () => {

    const navigate = useNavigate();

    const volver = () => {
        navigate("/characters");
    }

    return (
        <div>
            <h1>walter es el mejor</h1>
            <button onClick={volver}>volver</button>
        </div>
    );
};

export default Walter;