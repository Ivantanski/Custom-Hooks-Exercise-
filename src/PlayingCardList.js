import React from "react";
import { useAxios } from "./hooks";
import PlayingCard from "./PlayingCard";
import { formatCard } from "./helpers";
import "./PlayingCardList.css";   


function CardTable() {
  const [cards, addCard, clearCards] = useAxios("cards", "https://deckofcardsapi.com/api/deck/new/draw/");   


  // Improve error handling by showing a message when there are no cards
  const noCardsMessage = cards.length === 0 ? "No cards yet!" : null;

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={() => addCard(formatCard)}>Add a playing card!</button>
        <button onClick={clearCards}   
 disabled={cards.length === 0}>
          Clear the table
        </button>
      </div>
      <div className="PlayingCardList-card-area">
        {noCardsMessage || (
          cards.map((card) => (
            <PlayingCard key={card.id} front={card.image} />
          ))
        )}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
