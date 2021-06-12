import React, { useState, useEffect } from "react";
import axios from "axios";

import Character from "./Character";

import logo from "./show-logo.png";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [characterName, setCharacterName] = useState("");

  useEffect(() => {
    const getCharacters = async () => {
      const { data } = await axios.get(
        "https://www.breakingbadapi.com/api/characters"
      );
      console.log(data);
      setCharacters(data);
    };
    getCharacters();

    const message = document.querySelector(".message");
    setTimeout(() => {
      message.style.display = "none";
    }, 6000);
  }, []);

  const updateCharacterName = async (event) => {
    setCharacterName(event.target.value);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.get(
      `https://www.breakingbadapi.com/api/characters?name=${characterName}`
    );
    setCharacters(data);
  };

  return (
    <div className="App">
      <div className="header-logo">
        <img src={logo} alt="show logo" />
      </div>
      <div className="search-container">
        <form onSubmit={formSubmit}>
          <label htmlFor="character-name"></label>
          <input
            id="character-name"
            type="text"
            placeholder="Search Character"
            onChange={updateCharacterName}
            value={characterName}
          />
        </form>
      </div>
      {window.screen.width < 600 ? (
        <div className="message">
          <p>Click on images for more info!!</p>
        </div>
      ) : (
        <div className="message">
          <p>Hover on images for more info!!</p>
        </div>
      )}
      {characters.length > 0 ? (
        <div className="characters">
          {characters.map((character, index) => {
            if (character.appearance.length > 0) {
              return <Character character={character} key={index} />;
            } else return null;
          })}
        </div>
      ) : (
        <div className="loading">
          <h2>LOADING...</h2>
        </div>
      )}
    </div>
  );
}

export default App;
