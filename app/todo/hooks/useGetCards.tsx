"use client";
import { useEffect, useState } from "react";
import { CARDS_TYPES, defaultCards } from "../constants/const";

export default function useGetCards() {
  const [allCards, setAllCards] = useState(defaultCards);
  const [cardsSplit, setCardsSplit] = useState<Record<string, cardInfoType[]>>(
    {},
  );

  useEffect(() => {
    console.log("aa");
    splitCards();
  }, [allCards]);

  const splitCards = () => {
    let cardsSplit: Record<any, any> = {
      [CARDS_TYPES?.ONGOING]: [],
      [CARDS_TYPES?.COMPLETED]: [],
      [CARDS_TYPES?.EXPIRED]: [],
    };

    if (allCards && Object.entries(allCards)?.length) {
      Object.entries(allCards).forEach(([id, card]) => {
        if (card?.type === CARDS_TYPES?.ONGOING) {
          cardsSplit[CARDS_TYPES?.ONGOING].push(card);
        }
        if (card?.type === CARDS_TYPES?.EXPIRED) {
          cardsSplit[CARDS_TYPES?.EXPIRED].push(card);
        }
        if (card?.type === CARDS_TYPES?.COMPLETED) {
          cardsSplit[CARDS_TYPES?.COMPLETED].push(card);
        }
      });
    }

    setCardsSplit(cardsSplit);
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
   //console.log(e);
  };

  const onDragStop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
  };

  return {
    cardsSplit,
    onDragStop,
    onDragStart,
  };
}
