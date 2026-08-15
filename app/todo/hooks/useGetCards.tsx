"use client";
import { useMemo } from "react";
import { CARDS_TYPES, defaultCards } from "../constants/const";

export default function useGetCards() {
  const allCards = defaultCards;

  const cardsSplit = useMemo(() => {
    const splitCards: Record<string, cardInfoType[]> = {
      [CARDS_TYPES?.ONGOING]: [],
      [CARDS_TYPES?.COMPLETED]: [],
      [CARDS_TYPES?.EXPIRED]: [],
    };

    if (allCards && Object.entries(allCards)?.length) {
      Object.entries(allCards).forEach(([, card]) => {
        if (card?.type === CARDS_TYPES?.ONGOING) {
          splitCards[CARDS_TYPES?.ONGOING].push(card);
        }
        if (card?.type === CARDS_TYPES?.EXPIRED) {
          splitCards[CARDS_TYPES?.EXPIRED].push(card);
        }
        if (card?.type === CARDS_TYPES?.COMPLETED) {
          splitCards[CARDS_TYPES?.COMPLETED].push(card);
        }
      });
    }

    return splitCards;
  }, [allCards]);

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
