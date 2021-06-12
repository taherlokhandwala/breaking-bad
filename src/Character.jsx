import React from "react";

export default function Character({ character }) {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={character.img} alt="" />
        </div>
        <div className="flip-card-back">
          <h3 id="name">{character.name}</h3>
          <hr />
          <div className="info">
            <p>
              Nickname : <span className="p-span">{character.nickname}</span>
            </p>
            <div id="occupation">
              Occupation :
              {character.occupation.map((occ, index) => (
                <div className="p-span" key={index}>
                  {index + 1}. {occ}
                </div>
              ))}
            </div>
            <p>
              Status : <span className="p-span">{character.status}</span>
            </p>
            <p>
              Portrayed By :{" "}
              <span className="p-span">{character.portrayed}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
