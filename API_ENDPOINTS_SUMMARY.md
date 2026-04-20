# API Integration Summary

## Complete API Endpoint Mapping

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FPLytics API Endpoints                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐
│   Authentication APIs           │
├─────────────────────────────────┤
│
│  1️⃣  POST /api/register/
│     └─► src/api.js → registerUser()
│     └─► src/Register.jsx
│     └─► Route: /register
│
│  2️⃣  POST /api/login/
│     └─► src/api.js → loginUser()
│     └─► src/Login.jsx
│     └─► Route: /login
│
│  3️⃣  POST /api/logout/
│     └─► src/api.js → logoutUser()
│     └─► src/Profile.jsx
│     └─► Button: "Sign Out"
│
│  4️⃣  DELETE /api/delete-account/
│     └─► src/api.js → deleteAccount()
│     └─► src/Profile.jsx
│     └─► Button: "Delete Forever"
│
└─────────────────────────────────┘

┌─────────────────────────────────┐
│   Profile APIs                  │
├─────────────────────────────────┤
│
│  5️⃣  GET /fpl/profile
│     └─► src/api.js → getUserProfile()
│     └─► src/Profile.jsx
│     └─► Route: /profile
│     └─► Loads on component mount
│
│  6️⃣  PUT /fpl/profile
│     └─► src/api.js → updateUserProfile()
│     └─► src/Profile.jsx
│     └─► Button: "Save Changes"
│
└─────────────────────────────────┘

┌─────────────────────────────────┐
│   Players APIs                  │
├─────────────────────────────────┤
│
│  7️⃣  GET /api/players/
│     └─► src/api.js → getPlayers()
│     └─► src/Pages.jsx (Squad component)
│     └─► Route: /squad
│     └─► Loads players on component mount
│
│  8️⃣  GET /api/players/{id}/
│     └─► src/api.js → getPlayerById()
│     └─► Not yet implemented
│     └─► Template ready for use
│
│  9️⃣  POST /api/players/
│     └─► src/api.js → addPlayerToSquad()
│     └─► src/Pages.jsx (Squad component)
│     └─► Button: "Add to Squad" (handler ready)
│
│  🔟 DELETE /api/players/{id}/
│     └─► src/api.js → removePlayerFromSquad()
│     └─► Not yet implemented
│     └─► Template ready for use
│
└─────────────────────────────────┘
```

## File Linking Overview

```
src/
├── api.js ◄─────────────────────────────── CENTRAL API SERVICE
│   ├── registerUser()  ──────────────────► Register.jsx
│   ├── loginUser()  ──────────────────────► Login.jsx
│   ├── logoutUser()  ──────────────────────► Profile.jsx
│   ├── getUserProfile()  ──────────────────► Profile.jsx
│   ├── updateUserProfile()  ───────────────► Profile.jsx
│   ├── deleteAccount()  ───────────────────► Profile.jsx
│   ├── getPlayers()  ───────────────────────► Pages.jsx (Squad)
│   ├── getPlayerById()  ────────────────────► (Ready for use)
│   ├── addPlayerToSquad()  ─────────────────► Pages.jsx (Squad)
│   └── removePlayerFromSquad()  ────────────► (Ready for use)
│
├── App.js
│   └── Routes configured for all pages
│
├── Login.jsx ──────────────────────────── POST /api/login/
├── Register.jsx ─────────────────────────► POST /api/register/
├── Profile.jsx
│   ├── GET /fpl/profile
│   ├── PUT /fpl/profile
│   ├── POST /api/logout/
│   └── DELETE /api/delete-account/
│
└── Pages.jsx (Squad component) ──────────► GET /api/players/
```

## Quick Access Guide

### 1. To Use Login API

- **File:** `src/Login.jsx`
- **Function:** `loginUser(credentials)`
- **Endpoint:** `POST http://127.0.0.1:8000/api/login/`
- **Status:** ✅ Fully implemented

### 2. To Use Register API

- **File:** `src/Register.jsx`
- **Function:** `registerUser(userData)`
- **Endpoint:** `POST http://127.0.0.1:8000/api/register/`
- **Status:** ✅ Fully implemented

### 3. To Use Profile API

- **File:** `src/Profile.jsx`
- **Functions:** `getUserProfile()`, `updateUserProfile()`
- **Endpoint:** `GET/PUT http://127.0.0.1:8000/fpl/profile`
- **Status:** ✅ Fully implemented

### 4. To Use Logout API

- **File:** `src/Profile.jsx`
- **Function:** `logoutUser()`
- **Endpoint:** `POST http://127.0.0.1:8000/api/logout/`
- **Status:** ✅ Fully implemented

### 5. To Use Delete Account API

- **File:** `src/Profile.jsx`
- **Function:** `deleteAccount()`
- **Endpoint:** `DELETE http://127.0.0.1:8000/api/delete-account/`
- **Status:** ✅ Fully implemented

### 6. To Use Players API

- **File:** `src/Pages.jsx` (Squad component)
- **Function:** `getPlayers()`
- **Endpoint:** `GET http://127.0.0.1:8000/api/players/`
- **Status:** ✅ Fully implemented (list and display)
- **Status:** 🔄 Partially implemented (add/remove ready for use)

---

## How Each API Is Connected

### Registration Flow

```
/register route
    ↓
Register.jsx component
    ↓
handleSubmit() function
    ↓
registerUser() from api.js
    ↓
POST /api/register/ endpoint
    ↓
Token stored in localStorage
    ↓
Navigate to dashboard (/)
```

### Login Flow

```
/login route
    ↓
Login.jsx component
    ↓
handleSubmit() function
    ↓
loginUser() from api.js
    ↓
POST /api/login/ endpoint
    ↓
Token stored in localStorage
    ↓
Navigate to dashboard (/)
```

### Profile View Flow

```
/profile route
    ↓
Profile.jsx component
    ↓
useEffect() hook on mount
    ↓
getUserProfile() from api.js
    ↓
GET /fpl/profile endpoint
    ↓
Display profile data
```

### Squad/Players Flow

```
/squad route
    ↓
Squad component in Pages.jsx
    ↓
useEffect() hook on mount
    ↓
getPlayers() from api.js
    ↓
GET /api/players/ endpoint
    ↓
Display players grid
```

### Logout Flow

```
Profile.jsx → "Sign Out" button
    ↓
handleLogout() function
    ↓
logoutUser() from api.js
    ↓
POST /api/logout/ endpoint
    ↓
Remove token from localStorage
    ↓
Navigate to /login
```

### Account Deletion Flow

```
Profile.jsx → "Delete Forever" button
    ↓
Confirmation dialog shown
    ↓
handleDeleteAccount() function
    ↓
deleteAccount() from api.js
    ↓
DELETE /api/delete-account/ endpoint
    ↓
Remove token from localStorage
    ↓
Navigate to /login
```

---

## Configuration

### Base URL

- **Location:** `src/api.js` line 1
- **Current:** `http://127.0.0.1:8000`
- **Change this if:** Backend moves to different URL

### Authentication

- **Token Storage:** `localStorage.authToken`
- **Header Format:** `Authorization: Bearer {token}`
- **Automatic:** Token added to all authenticated requests

### Error Handling

- **Catch:** All API calls wrapped in try-catch
- **Display:** Errors shown in components
- **Logging:** Check browser console for detailed errors

---

## Next Steps to Complete

### High Priority

- [ ] Test all APIs with real backend
- [ ] Add loading states to all pages
- [ ] Implement add player to squad functionality
- [ ] Implement remove player from squad functionality

### Medium Priority

- [ ] Add pagination to players list
- [ ] Add search/filter for players
- [ ] Add success notifications
- [ ] Add retry logic for failed requests

### Low Priority

- [ ] Add player statistics details page
- [ ] Add player comparison feature
- [ ] Add favorites/bookmarks
- [ ] Add transfer recommendations

---

## File Checklist

✅ `src/api.js` - Central API service with all endpoints
✅ `src/Login.jsx` - Login page with API integration
✅ `src/Register.jsx` - Registration page with API integration
✅ `src/Profile.jsx` - Profile page with all account features
✅ `src/Pages.jsx` - Squad page with players listing
✅ `src/App.js` - Routes configured for all pages
✅ `API_INTEGRATION_GUIDE.md` - Detailed documentation

---

## Testing Checklist

- [ ] Registration: Create new account
- [ ] Login: Sign in with account
- [ ] Profile: View and edit profile
- [ ] Players: Browse player list
- [ ] Logout: Sign out successfully
- [ ] Delete: Delete account (be careful!)
- [ ] Token: Verify token in localStorage
- [ ] Errors: Test error handling
- [ ] Redirects: Check all navigation works

---

## Support Files

- `API_INTEGRATION_GUIDE.md` - Detailed endpoint documentation
- `API_ENDPOINTS_SUMMARY.md` - This file
- `src/api.js` - All API functions with JSDoc comments

Refer to these files for detailed information about each endpoint.
