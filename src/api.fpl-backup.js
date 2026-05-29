'use strict'

// ==================== FPL (Fantasy Premier League) APIs ====================
// This is a BACKUP file with FPL API functions
// To restore, copy these functions back to api.js

const FPL_API_BASE = "https://fantasy.premierleague.com/api";

/**
 * Get bootstrap static data from FPL API
 */
export const getFPLBootstrapData = async () => {
  const targetUrl = `${FPL_API_BASE}/bootstrap-static/`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
  
  return fetch(proxyUrl)
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    });
};

/**
 * Get detailed info for a specific player
 */
export const getFPLPlayerDetail = async (playerId) => {
  const targetUrl = `${FPL_API_BASE}/element-summary/${playerId}/`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
  
  return fetch(proxyUrl)
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    });
};

/**
 * Get current gameweek fixtures and status
 */
export const getFPLFixtures = async () => {
  const targetUrl = `${FPL_API_BASE}/fixtures/`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
  
  return fetch(proxyUrl)
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    });
};

/**
 * Get team standings and stats
 */
export const getFPLTeamStandings = async () => {
  const targetUrl = `${FPL_API_BASE}/teams/`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
  
  return fetch(proxyUrl)
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    });
};
