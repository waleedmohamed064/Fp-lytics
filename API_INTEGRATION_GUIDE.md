# FPLytics API Integration Guide

## Overview

This document maps all API endpoints to their corresponding code implementations in the FPLytics React application.

## API Endpoints Summary

| Endpoint               | Method          | Purpose                 | File     | Component           |
| ---------------------- | --------------- | ----------------------- | -------- | ------------------- |
| `/api/register/`       | POST            | User registration       | `api.js` | `Register.jsx`      |
| `/api/login/`          | POST            | User authentication     | `api.js` | `Login.jsx`         |
| `/api/logout/`         | POST            | User logout             | `api.js` | `Profile.jsx`       |
| `/fpl/profile`         | GET/PUT         | User profile management | `api.js` | `Profile.jsx`       |
| `/api/delete-account/` | DELETE          | Account deletion        | `api.js` | `Profile.jsx`       |
| `/api/players/`        | GET/POST/DELETE | Players management      | `api.js` | `Pages.jsx` (Squad) |

---

## API Implementations

### 1. Authentication API - User Registration

**Endpoint:** `http://127.0.0.1:8000/api/register/`  
**Method:** POST

**Files:**

- **API Service:** `src/api.js` - `registerUser(userData)`
- **Component:** `src/Register.jsx`

**Request Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Implementation:**

```javascript
// In Register.jsx - handleSubmit()
const response = await registerUser({
  username: formData.username,
  email: formData.email,
  password: formData.password,
});

// Token is stored for future requests
if (response.token) {
  localStorage.setItem("authToken", response.token);
}
```

**Features:**

- Email validation
- Password confirmation
- Minimum password length (8 characters)
- Error handling and display
- Automatic redirect to dashboard on success

---

### 2. Authentication API - User Login

**Endpoint:** `http://127.0.0.1:8000/api/login/`  
**Method:** POST

**Files:**

- **API Service:** `src/api.js` - `loginUser(credentials)`
- **Component:** `src/Login.jsx`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Implementation:**

```javascript
// In Login.jsx - handleSubmit()
const response = await loginUser({
  email: formData.email,
  password: formData.password,
});

// Token stored and user redirected to dashboard
if (response.token) {
  localStorage.setItem("authToken", response.token);
  navigate("/");
}
```

**Features:**

- Input validation
- Loading states
- Error handling
- Token-based authentication
- Redirect to dashboard after login

---

### 3. Profile API - Get User Profile

**Endpoint:** `http://127.0.0.1:8000/fpl/profile`  
**Method:** GET

**Files:**

- **API Service:** `src/api.js` - `getUserProfile()`
- **Component:** `src/Profile.jsx`

**Authentication:** Bearer Token (automatically added by `apiRequest()`)

**Implementation:**

```javascript
// In Profile.jsx - loadProfile()
const data = await getUserProfile();
setProfile(data);
```

**Features:**

- Automatic token inclusion in headers
- Loading state management
- Error handling
- Profile data display

---

### 4. Profile API - Update User Profile

**Endpoint:** `http://127.0.0.1:8000/fpl/profile`  
**Method:** PUT

**Files:**

- **API Service:** `src/api.js` - `updateUserProfile(profileData)`
- **Component:** `src/Profile.jsx`

**Request Body:**

```json
{
  "username": "string",
  "email": "string"
}
```

**Implementation:**

```javascript
// In Profile.jsx - handleUpdateProfile()
const updated = await updateUserProfile(editData);
setProfile(updated);
```

**Features:**

- In-place profile editing
- Cancel/Save options
- Success notification
- Error handling

---

### 5. Authentication API - User Logout

**Endpoint:** `http://127.0.0.1:8000/api/logout/`  
**Method:** POST

**Files:**

- **API Service:** `src/api.js` - `logoutUser()`
- **Component:** `src/Profile.jsx`

**Authentication:** Bearer Token (automatically added)

**Implementation:**

```javascript
// In Profile.jsx - handleLogout()
await logoutUser();
localStorage.removeItem("authToken");
navigate("/login");
```

**Features:**

- Session termination
- Token cleanup
- Redirect to login page

---

### 6. Account Management API - Delete Account

**Endpoint:** `http://127.0.0.1:8000/api/delete-account/`  
**Method:** DELETE

**Files:**

- **API Service:** `src/api.js` - `deleteAccount()`
- **Component:** `src/Profile.jsx`

**Authentication:** Bearer Token (automatically added)

**Implementation:**

```javascript
// In Profile.jsx - handleDeleteAccount()
await deleteAccount();
localStorage.removeItem("authToken");
navigate("/login");
```

**Features:**

- Confirmation prompt
- Loading state
- Error handling
- Automatic logout and redirect

---

### 7. Players API - Get All Players

**Endpoint:** `http://127.0.0.1:8000/api/players/`  
**Method:** GET

**Files:**

- **API Service:** `src/api.js` - `getPlayers(filters)`
- **Component:** `src/Pages.jsx` (Squad component)

**Query Parameters (Optional):**

```
?team=Liverpool&position=Forward
```

**Implementation:**

```javascript
// In Pages.jsx - Squad component - loadPlayers()
const data = await getPlayers();
setPlayers(data.results || data);
```

**Features:**

- Player listing
- Optional filtering support
- Loading state with spinner
- Error handling
- Card-based display

**Response Structure (Expected):**

```json
{
  "results": [
    {
      "id": 1,
      "name": "Harry Kane",
      "first_name": "Harry",
      "position": "Forward",
      "element_type": "Forward",
      "team": "Tottenham"
    }
  ]
}
```

---

### 8. Players API - Get Single Player

**Endpoint:** `http://127.0.0.1:8000/api/players/{playerId}/`  
**Method:** GET

**Files:**

- **API Service:** `src/api.js` - `getPlayerById(playerId)`
- **Component:** Not yet implemented

**Implementation Template:**

```javascript
const player = await getPlayerById(123);
```

---

### 9. Players API - Add Player to Squad

**Endpoint:** `http://127.0.0.1:8000/api/players/`  
**Method:** POST

**Files:**

- **API Service:** `src/api.js` - `addPlayerToSquad(playerId)`
- **Component:** `src/Pages.jsx` (Squad component - button handler)

**Request Body:**

```json
{
  "player_id": 123
}
```

**Implementation Template (In Squad component):**

```javascript
const handleAddPlayer = async (playerId) => {
  try {
    await addPlayerToSquad(playerId);
    // Refresh players list or show success message
  } catch (error) {
    console.error("Failed to add player:", error);
  }
};
```

---

### 10. Players API - Remove Player from Squad

**Endpoint:** `http://127.0.0.1:8000/api/players/{playerId}/`  
**Method:** DELETE

**Files:**

- **API Service:** `src/api.js` - `removePlayerFromSquad(playerId)`
- **Component:** Not yet implemented

**Implementation Template:**

```javascript
const handleRemovePlayer = async (playerId) => {
  try {
    await removePlayerFromSquad(playerId);
    // Refresh players list or show success message
  } catch (error) {
    console.error("Failed to remove player:", error);
  }
};
```

---

## Authentication Flow

### Token Management

- **Storage:** `localStorage.setItem("authToken", token)`
- **Retrieval:** Token is automatically added to all requests via `apiRequest()` helper
- **Header Format:** `Authorization: Bearer {token}`

### Protected Routes

All API requests automatically include the authentication token in headers:

```javascript
const apiRequest = async (url, options = {}) => {
  const token = localStorage.getItem("authToken");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // ... rest of implementation
};
```

---

## Error Handling

### API Error Response

All errors are caught and displayed to the user:

```javascript
try {
  const response = await apiRequest(url, options);
  return response;
} catch (error) {
  throw new Error(error.message || `API Error: ${response.status}`);
}
```

### Component Error States

- **Login/Register:** Error message displayed below form
- **Profile:** Alert banner at top with error message
- **Squad:** Alert banner for loading errors

---

## Navigation Routes

| Route        | Component     | Purpose                            |
| ------------ | ------------- | ---------------------------------- |
| `/login`     | Login.jsx     | User login page                    |
| `/register`  | Register.jsx  | User registration page             |
| `/`          | Home.jsx      | Dashboard home                     |
| `/squad`     | Squad.jsx     | Squad management with players list |
| `/transfers` | Transfers.jsx | Transfers hub                      |
| `/stats`     | Stats.jsx     | Statistics page                    |
| `/alerts`    | Alerts.jsx    | Smart alerts                       |
| `/more`      | More.jsx      | Additional tools                   |
| `/profile`   | Profile.jsx   | User profile & account settings    |

---

## Quick Reference: API Function Usage

### In Components

```javascript
// Import API functions
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getPlayers,
  deleteAccount,
} from "./api";

// Use in component
try {
  const response = await loginUser({ email, password });
  localStorage.setItem("authToken", response.token);
} catch (error) {
  setErrorMessage(error.message);
}
```

### Base URL

```javascript
const API_BASE_URL = "http://127.0.0.1:8000";
```

### Modifying Base URL

If API moves to a different URL, update `src/api.js` line 1:

```javascript
const API_BASE_URL = "http://your-new-url:port";
```

---

## Testing the API Integration

### 1. Test Registration

- Navigate to `/register`
- Fill in username, email, password
- Verify token is stored in localStorage
- Confirm redirect to dashboard

### 2. Test Login

- Navigate to `/login`
- Enter credentials
- Verify token is stored
- Confirm redirect to dashboard

### 3. Test Profile

- Navigate to `/profile`
- Verify profile data loads
- Test edit profile functionality
- Test logout button

### 4. Test Players

- Navigate to `/squad`
- Verify players list loads
- Test filtering (if implemented in backend)

---

## Next Steps

1. **Implement Player Addition:** Update Squad component's "Add to Squad" button
2. **Implement Player Removal:** Create delete functionality in player cards
3. **Add Loading States:** Show spinners during API requests
4. **Add Success Notifications:** Show confirmation messages
5. **Implement Pagination:** For large player lists
6. **Add Search/Filter:** Player search functionality

---

## API Service File Structure

```
src/api.js
├── API_BASE_URL: Configuration
├── API_ENDPOINTS: Endpoint definitions
├── apiRequest(): Helper function for all requests
├── Authentication APIs
│   ├── registerUser()
│   ├── loginUser()
│   ├── logoutUser()
│   └── deleteAccount()
├── Profile APIs
│   ├── getUserProfile()
│   └── updateUserProfile()
└── Players APIs
    ├── getPlayers()
    ├── getPlayerById()
    ├── addPlayerToSquad()
    └── removePlayerFromSquad()
```
