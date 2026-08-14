"use client";

import Cards from "./components/Cards";
import { CARDS_TYPES } from "./constants/const";
import useGetCards from "./hooks/useGetCards";

export default function TODO() {
  const { cardsSplit, onDragStart, onDragStop } = useGetCards();

  return (
    <div>
      <Cards>
        <>
          {cardsSplit[CARDS_TYPES.ONGOING]?.length ? (
            <Cards.OngoingCard onDragStart = {onDragStart} onDragStop = {onDragStop} cards={cardsSplit[CARDS_TYPES.ONGOING]} />
          ) : null}
          {cardsSplit[CARDS_TYPES.COMPLETED]?.length ? (
            <Cards.CompletedCard onDragStart = {onDragStart} onDragStop = {onDragStop} cards={cardsSplit[CARDS_TYPES.COMPLETED]} />
          ) : null}
          {cardsSplit[CARDS_TYPES.EXPIRED]?.length ? (
            <Cards.ExpiredCards  onDragStart = {onDragStart} onDragStop = {onDragStop}cards={cardsSplit[CARDS_TYPES.EXPIRED]} />
          ) : null}
        </>
      </Cards>
    </div>
  );
}
