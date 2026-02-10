"use client";

import { useEffect, useState } from "react";
import CardsGrid, { GameCard } from "@/components/CardsGrid";
import { fetchGameList, GameListItem } from "@/lib/api";

function normalizeGameCards(items: GameListItem[]): GameCard[] {
  return items
    .filter((item) => Boolean(item.coverUrl))
    .map((item) => {
      const title = (item.name ?? item.namee)?.trim();
      return {
        id: item.gameId ?? item.coverUrl,
        image: item.coverUrl,
        title: title || undefined,
      };
    });
}

export default function GameCardsSection() {
  const [cards, setCards] = useState<GameCard[]>([]);

  useEffect(() => {
    let active = true;

    fetchGameList()
      .then((response) => {
        const payload = response.data;
        if (payload.code !== 1 || !Array.isArray(payload.data)) {
          return;
        }
        const normalized = normalizeGameCards(payload.data);
        if (active) {
          setCards(normalized);
        }
      })
      .catch(() => {
        if (active) {
          setCards([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const popularCards = cards.slice(0, 8);
  const gameCards = cards.slice(8, 16);
  const featuredCards = cards.slice(16, 24);
  const resolvedGameCards = gameCards.length ? gameCards : popularCards;
  const resolvedFeaturedCards = featuredCards.length
    ? featuredCards
    : popularCards;

  return (
    <>
      <CardsGrid title="Popular" cards={popularCards} columns={4} />
      <CardsGrid title="NEW" cards={resolvedGameCards} columns={4} />
      <CardsGrid title="FEATURED" cards={resolvedFeaturedCards} columns={4} />
    </>
  );
}
