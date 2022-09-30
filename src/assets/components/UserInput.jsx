import React from "react";
import { useDispatch } from "react-redux";
import { changeName } from "../../store/slices/userName.slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const UserInput = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const dispatchUserName = () => {
    dispatch(changeName(userName));
    navigate("/characters");
  };

  return (
    <div className='login-page'>
      <h1>¿Are you ready?</h1>
      <input placeholder="type your name"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button  onClick={dispatchUserName}>Send</button>
    </div>
  );
};

export default UserInput;

