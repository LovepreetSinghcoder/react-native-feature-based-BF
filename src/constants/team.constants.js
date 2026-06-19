// src/constants/team.constants.js

export const TEAM_LIMITS = {
  SQUAD_SIZE: 11,
  MAX_PLAYERS: 11,
  MAX_PER_ROLE: {
    WICKET_KEEPER: 4,
    BATSMAN: 5,
    ALL_ROUNDER: 4,
    BOWLER: 4,
  },
  MIN_PER_ROLE: {
    WICKET_KEEPER: 1,
    BATSMAN: 3,
    ALL_ROUNDER: 1,
    BOWLER: 3,
  },
};

export const TEAM_ROLES = {
  WICKET_KEEPER: "WICKET_KEEPER",
  BATSMAN: "BATSMAN",
  ALL_ROUNDER: "ALL_ROUNDER",
  BOWLER: "BOWLER",
};
