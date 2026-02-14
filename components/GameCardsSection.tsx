"use client";

import { useEffect, useState } from "react";
import CardsGrid, { GameCard } from "@/components/CardsGrid";
import { fetchGameList, GameListItem } from "@/lib/api";

const GAME_WEB_BASE_URL = "http://game-web.cac.homes/";

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

function resolveGameId(value: GameCard["id"]): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.trunc(value);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    if (Number.isFinite(parsed)) {
      return Math.trunc(parsed);
    }
  }
  return null;
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
  const handleCardClick = (card: GameCard) => {
    const userName = localStorage.getItem("uname");
    const launchToken = localStorage.getItem("jwt");
    if (!userName || !launchToken) {
      window.dispatchEvent(new Event("open-login-modal"));
      return;
    }

    const gameId = resolveGameId(card.id);
    if (gameId === null) {
      return;
    }

    const params = new URLSearchParams({
      user_name: userName,
      token: launchToken,
      game_id: String(gameId),
    });
    window.location.href = `${GAME_WEB_BASE_URL}?${params.toString()}`;
  };

  return (
    <>
      <CardsGrid
        title="Popular"
        cards={popularCards}
        columns={4}
        onCardClick={handleCardClick}
      />
      <CardsGrid
        title="NEW"
        cards={resolvedGameCards}
        columns={4}
        onCardClick={handleCardClick}
      />
      <CardsGrid
        title="FEATURED"
        cards={resolvedFeaturedCards}
        columns={4}
        onCardClick={handleCardClick}
      />
    </>
  );
}
