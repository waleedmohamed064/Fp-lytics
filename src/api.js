// API Configuration
const API_BASE_URL = "http://127.0.0.1:8000";

const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/api/register/`,
  LOGIN: `${API_BASE_URL}/api/login/`,
  LOGOUT: `${API_BASE_URL}/api/logout/`,
  PROFILE: `${API_BASE_URL}/fpl/profile`,
  DELETE_ACCOUNT: `${API_BASE_URL}/api/delete-account/`,
  PLAYERS: `${API_BASE_URL}/api/players/`,
};

// Helper function for API requests with authentication
const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return await response.json();
};

// ==================== Authentication APIs ====================

/**
 * Register a new user
 * @param {Object} userData - { email, password, username, etc. }
 * @returns {Promise<Object>} - Registration response with token
 */
export const registerUser = async (userData) => {
  return apiRequest(API_ENDPOINTS.REGISTER, {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - Login response with token
 */
export const loginUser = async (credentials) => {
  return apiRequest(API_ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

/**
 * Logout user
 * @returns {Promise<Object>} - Logout response
 */
export const logoutUser = async () => {
  return apiRequest(API_ENDPOINTS.LOGOUT, {
    method: "POST",
  });
};

/**
 * Delete user account
 * @returns {Promise<Object>} - Account deletion response
 */
export const deleteAccount = async () => {
  return apiRequest(API_ENDPOINTS.DELETE_ACCOUNT, {
    method: "DELETE",
  });
};

// ==================== Profile APIs ====================

/**
 * Get user profile
 * @returns {Promise<Object>} - User profile data
 */
export const getUserProfile = async () => {
  return apiRequest(API_ENDPOINTS.PROFILE, {
    method: "GET",
  });
};

/**
 * Update user profile
 * @param {Object} profileData - Updated profile information
 * @returns {Promise<Object>} - Updated profile response
 */
export const updateUserProfile = async (profileData) => {
  return apiRequest(API_ENDPOINTS.PROFILE, {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};

// ==================== Player APIs ====================

/**
 * Get all players
 * @param {Object} filters - Optional filters (e.g., { team, position })
 * @returns {Promise<Object>} - List of players
 */
export const getPlayers = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const url = `${API_ENDPOINTS.PLAYERS}${params.toString() ? "?" + params : ""}`;

  return apiRequest(url, {
    method: "GET",
  });
};

/**
 * Get a specific player by ID
 * @param {string|number} playerId - Player ID
 * @returns {Promise<Object>} - Player details
 */
export const getPlayerById = async (playerId) => {
  return apiRequest(`${API_ENDPOINTS.PLAYERS}${playerId}/`, {
    method: "GET",
  });
};

/**
 * Add player to squad
 * @param {string|number} playerId - Player ID
 * @returns {Promise<Object>} - Response from adding player
 */
export const addPlayerToSquad = async (playerId) => {
  return apiRequest(API_ENDPOINTS.PLAYERS, {
    method: "POST",
    body: JSON.stringify({ player_id: playerId }),
  });
};

/**
 * Remove player from squad
 * @param {string|number} playerId - Player ID
 * @returns {Promise<Object>} - Response from removing player
 */
export const removePlayerFromSquad = async (playerId) => {
  return apiRequest(`${API_ENDPOINTS.PLAYERS}${playerId}/`, {
    method: "DELETE",
  });
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  deleteAccount,
  getUserProfile,
  updateUserProfile,
  getPlayers,
  getPlayerById,
  addPlayerToSquad,
  removePlayerFromSquad,
  API_ENDPOINTS,
};
