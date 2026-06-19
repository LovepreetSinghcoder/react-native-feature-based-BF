// src/config/api.routes.js
export const API_ROUTES = {
  // ─── AUTH ───────────────────────────────────────────
  AUTH: {
    CHECK: "/auth/check",
    ME: "/auth/me",
    GOOGLE: {
      CONSENT_URL: "/auth/google", // GET  - get consent URL
      EXCHANGE: "/auth/google", // POST - code exchange
      CALLBACK_GET: "/auth/google/callback",
      CALLBACK_POST: "/auth/google/callback",
      MOBILE: "/auth/mobile/google", // POST - mobile id token exchange
    },

    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",

    ACCOUNT_DELETE: "/auth/account",

    PROFILE: {
      UPDATE: "/auth/profile",
      ME: "/auth/profile/me",
      SETUP: "/auth/profile/setup",
      PREFERENCES: "auth/profile/preferences",
    },
  },

  // ─── CATALOG ────────────────────────────────────────
  CATALOG: {
    SPORTS: "/catalog/sports",

    TOURNAMENTS: {
      BY_SPORT: (sportCode) => `/catalog/sports/${sportCode}/tournaments`,

      DETAIL: (code) => `/catalog/tournaments/${code}`,

      FANTASY_RULES: (code) => `/catalog/tournaments/${code}/fantasy-rules`,

      SCORING_RULES: (code) => `/catalog/tournaments/${code}/scoring-rules`,

      TEAMS: (code) => `/catalog/tournaments/${code}/teams`,

      PLAYERS: (code) => `/catalog/tournaments/${code}/players`,

      LIST: (code) => `/catalog/tournaments/${code}/matches`,
      MATCHES: {
        LIVE_AND_UPCOMING: (code) =>
          `/catalog/tournaments/${code}/matches/live-and-upcoming`,

        LINEUPS: (code, matchId) =>
          `/catalog/tournaments/${code}/matches/${matchId}/lineups`,
      },

      // PLAYER STATS
      PLAYER_STATS: {
        DETAIL: (code, playerId) =>
          `/catalog/tournaments/${code}/player-stats/${playerId}`,

        LEADERBOARD: (code, sortBy, order) =>
          `/catalog/tournaments/${code}/player-stats/leaderboard${
            sortBy || order
              ? `?${[
                  sortBy ? `sortBy=${sortBy}` : null,
                  order ? `order=${order}` : null,
                ]
                  .filter(Boolean)
                  .join("&")}`
              : ""
          }`,
      },
    },
  },

  // ─── FANTASY TEAM ────────────────────────────────────
  FANTASY: {
    TEAM: {
      GET_OR_CREATE: (code) => `/fantasy/tournaments/${code}/me/team`,

      REPLACE_SQUAD: (code) => `/fantasy/tournaments/${code}/me/team/squad`,

      // ✅ TEAM NAME ROUTES
      NAME: {
        GET: (code) => `/fantasy/tournaments/${code}/me/team/name`,
        CREATE: (code) => `/fantasy/tournaments/${code}/me/team/name`, // POST
        UPDATE: (code) => `/fantasy/tournaments/${code}/me/team/name`, // PUT
      },

      // ✅ NEW ROUTE
      LAST_LIVE_OR_COMPLETED: (code) =>
        `/fantasy/tournaments/${code}/me/last-live-or-completed-team`,
    },

    MATCHES: {
      LAST_COMPLETED: (code) =>
        `/fantasy/tournaments/${code}/me/last-completed-match`,

      POINTS: (code, matchId) =>
        `/fantasy/tournaments/${code}/me/matches/${matchId}/points`,

      SUMMARY: (code) => `/fantasy/tournaments/${code}/me/summary`,
    },

    TRANSFERS: {
      SWAP: (code) => `/fantasy/tournaments/${code}/me/transfers`,

      CANCEL: (code, transferId) =>
        `/fantasy/tournaments/${code}/me/transfers/${transferId}/cancel`,

      HISTORY: (code) => `/fantasy/tournaments/${code}/me/transfers/history`,

      USAGE: (code, matchId) =>
        `/fantasy/tournaments/${code}/me/transfers/usage${
          matchId ? `?matchId=${matchId}` : ""
        }`,
    },

    // ─── ROOMS (Social / Leagues) ──────────────────────
    ROOMS: {
      // User scope
      MY_ROOMS: "/fantasy/me/rooms",

      // Room lifecycle
      CREATE: (code) => `/fantasy/tournaments/${code}/rooms`,
      JOIN: "/fantasy/rooms/join",
      LEAVE: (roomId) => `/fantasy/rooms/${roomId}/leave`,
      DELETE: (roomId) => `/fantasy/rooms/${roomId}`, // Archieve the Room/League

      // Room data
      DETAIL: (roomId) => `/fantasy/rooms/${roomId}`,
      MEMBERS: (roomId) => `/fantasy/rooms/${roomId}/members`,

      // Room leaderboard
      LEADERBOARD: (roomId) => `/fantasy/rooms/${roomId}/leaderboard`,
    },

    LEADERBOARD: {
      GLOBAL: (code) => `/fantasy/tournaments/${code}/leaderboard/global`,
    },
  },

  // ─── MATCH FANTASY ───────────────────────────────────
  MATCH_FANTASY: {
    // ─── USER TEAM ────────────────────────────────────
    TEAM: {
      /**
       * GET
       * Returns:
       * - editable CURRENT team for scheduled matches
       * - locked SNAPSHOT team for live/completed matches
       */
      GET: (code, matchId) =>
        `/match-fantasy/leagues/${code}/matches/${matchId}/me/team`,

      /**
       * PUT
       * Replace entire per-match fantasy team
       */
      REPLACE: (code, matchId) =>
        `/match-fantasy/leagues/${code}/matches/${matchId}/me/team`,
    },

    // ─── USER POINTS ──────────────────────────────────
    POINTS: {
      /**
       * Match-specific fantasy points
       */
      MATCH: (code, matchId) =>
        `/match-fantasy/leagues/${code}/matches/${matchId}/me/points`,

      /**
       * Consolidated points across all entered matches
       */
      CONSOLIDATED: (code) =>
        `/match-fantasy/leagues/${code}/me/consolidated-points`,
    },

    // ─── LEADERBOARDS ─────────────────────────────────
    LEADERBOARD: {
      /**
       * Consolidated global leaderboard
       * Across all match fantasy contests in league
       */
      GLOBAL: (code, page, limit) =>
        `/match-fantasy/leagues/${code}/leaderboard/global${
          page || limit
            ? `?${[
                page ? `page=${page}` : null,
                limit ? `limit=${limit}` : null,
              ]
                .filter(Boolean)
                .join("&")}`
            : ""
        }`,

      /**
       * Single match leaderboard
       */
      MATCH: (code, matchId, page, limit) =>
        `/match-fantasy/leagues/${code}/matches/${matchId}/leaderboard/global${
          page || limit
            ? `?${[
                page ? `page=${page}` : null,
                limit ? `limit=${limit}` : null,
              ]
                .filter(Boolean)
                .join("&")}`
            : ""
        }`,
    },
  },

  // ─── CAREER ──────────────────────────────────────────
  CAREER: {
    LEADERBOARD: {
      GLOBAL: (page, limit) =>
        `/leaderboard/career${
          page || limit
            ? `?${[
                page ? `page=${page}` : null,
                limit ? `limit=${limit}` : null,
              ]
                .filter(Boolean)
                .join("&")}`
            : ""
        }`,

      SPORT: (sportCode, page, limit) =>
        `/leaderboard/career/sport/${sportCode}${
          page || limit
            ? `?${[
                page ? `page=${page}` : null,
                limit ? `limit=${limit}` : null,
              ]
                .filter(Boolean)
                .join("&")}`
            : ""
        }`,
    },

    ME: {
      OVERVIEW: "/me/career",

      SPORT: (sportCode) => `/me/career/sport/${sportCode}`,

      TOURNAMENT: (code) => `/me/career/tournament/${code}`,
    },

    SNAPSHOTS: {
      LIST: (code) => `/tournaments/${code}/snapshots`,

      DETAIL: (code, snapshotId) =>
        `/tournaments/${code}/snapshots/${snapshotId}`,
    },
  },

  // ─── INTERNAL (admin/job use only) ──────────────────
  INTERNAL: {
    FANTASY: {
      PROCESS_MATCH: (matchId) =>
        `/internal/fantasy/matches/${matchId}/process`,

      UPSERT_STAT_LINES: (matchId) =>
        `/internal/fantasy/matches/${matchId}/stat-lines`,
    },
  },

  // ─── BOOSTERS  ────────────────────────────────────

  BOOSTERS: {
    LIST: "/fantasy/boosters",

    STATE: (code) => `/fantasy/tournaments/${code}/boosters/state`,

    SELECT: (code) => `/fantasy/tournaments/${code}/boosters/select`,

    CLEAR: (code) => `/fantasy/tournaments/${code}/boosters/clear`,
  },

  // ─── NOTIFICATIONS ───────────────────────────────────
  NOTIFICATIONS: {
    TOKENS: {
      REGISTER: "/notifications/tokens", // POST  - register FCM token
      UPDATE: "/notifications/tokens", // PATCH - refresh/replace token
      REMOVE: "/notifications/tokens", // DELETE - remove token

      TOPICS: {
        SUBSCRIBE: "/notifications/tokens/topics", // POST  - subscribe to topics
        UNSUBSCRIBE: "/notifications/tokens/topics", // DELETE - unsubscribe from topics
      },
    },
  },
};
