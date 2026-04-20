# API Quick Reference Card

## 📋 All Endpoints at a Glance

| #   | Endpoint               | Method | Component    | File   | Status            |
| --- | ---------------------- | ------ | ------------ | ------ | ----------------- |
| 1   | `/api/register/`       | POST   | Register.jsx | api.js | ✅ Complete       |
| 2   | `/api/login/`          | POST   | Login.jsx    | api.js | ✅ Complete       |
| 3   | `/api/logout/`         | POST   | Profile.jsx  | api.js | ✅ Complete       |
| 4   | `/fpl/profile`         | GET    | Profile.jsx  | api.js | ✅ Complete       |
| 5   | `/fpl/profile`         | PUT    | Profile.jsx  | api.js | ✅ Complete       |
| 6   | `/api/delete-account/` | DELETE | Profile.jsx  | api.js | ✅ Complete       |
| 7   | `/api/players/`        | GET    | Pages.jsx    | api.js | ✅ Complete       |
| 8   | `/api/players/`        | POST   | Pages.jsx    | api.js | 🔄 Template Ready |
| 9   | `/api/players/{id}/`   | GET    | -            | api.js | 🔄 Template Ready |
| 10  | `/api/players/{id}/`   | DELETE | -            | api.js | 🔄 Template Ready |

---

## 🔗 API Functions & Routes

### Authentication

```javascript
// File: src/api.js

registerUser(userData); // POST /api/register/
loginUser(credentials); // POST /api/login/
logoutUser(); // POST /api/logout/
deleteAccount(); // DELETE /api/delete-account/
```

**Routes:**

- `/register` → Register.jsx
- `/login` → Login.jsx
- `/profile` → Profile.jsx (has logout & delete buttons)

---

### Profile

```javascript
// File: src/api.js

getUserProfile(); // GET /fpl/profile
updateUserProfile(data); // PUT /fpl/profile
```

**Component:** src/Profile.jsx  
**Route:** `/profile`

---

### Players

```javascript
// File: src/api.js

getPlayers(filters); // GET /api/players/
getPlayerById(playerId); // GET /api/players/{id}/
addPlayerToSquad(playerId); // POST /api/players/
removePlayerFromSquad(playerId); // DELETE /api/players/{id}/
```

**Component:** src/Pages.jsx (Squad)  
**Route:** `/squad`

---

## 📁 File Locations

```
src/
├── api.js ................ ALL API FUNCTIONS
├── App.js ................ ROUTES & NAVIGATION
├── Login.jsx ............. Uses loginUser()
├── Register.jsx .......... Uses registerUser()
├── Profile.jsx ........... Uses profile APIs
└── Pages.jsx ............. Squad uses getPlayers()
```

---

## 🚀 Usage Examples

### Import APIs

```javascript
import { loginUser, registerUser, getUserProfile, getPlayers } from "./api";
```

### Use in Component

```javascript
// In Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await loginUser({
    email: formData.email,
    password: formData.password,
  });
  localStorage.setItem("authToken", response.token);
  navigate("/");
};

// In Pages.jsx (Squad)
useEffect(() => {
  const loadPlayers = async () => {
    const data = await getPlayers();
    setPlayers(data.results || data);
  };
  loadPlayers();
}, []);
```

---

## 🔐 Authentication

**Token Storage:** `localStorage.authToken`  
**Sent with:** All authenticated requests via `Authorization: Bearer {token}` header  
**Automatic:** Added by `apiRequest()` helper function

**Public endpoints:**

- `/api/register/` - No token needed
- `/api/login/` - No token needed

**Protected endpoints:**

- `/fpl/profile` - Token required
- `/api/logout/` - Token required
- `/api/delete-account/` - Token required
- `/api/players/` - Token required (likely)

---

## ⚙️ Configuration

**Base URL:** `src/api.js` line 1

```javascript
const API_BASE_URL = "http://127.0.0.1:8000";
```

**Change this if backend URL changes**

---

## 🎯 Navigation Map

```
/login ───────────────────────► Login.jsx
                                   ↓
                              POST /api/login/
                                   ↓
                              Store token ──┐
                                         │
/register ───────────────────► Register.jsx
                                   ↓
                            POST /api/register/
                                   ↓
                              Store token ──┐
                                         │
/ (Dashboard) ◄────────────────────────┘
    │
    ├─► /squad ────────────► GET /api/players/
    ├─► /stats
    ├─► /transfers
    ├─► /alerts
    ├─► /more
    └─► /profile ──────────► GET /fpl/profile
                                │
                                ├─ PUT /fpl/profile (edit)
                                ├─ POST /api/logout/
                                └─ DELETE /api/delete-account/
```

---

## ❌ Error Handling

All API calls wrapped in try-catch:

```javascript
try {
  const data = await apiFunction();
  // Success - handle data
} catch (error) {
  // Error - error.message contains details
  setErrorMessage(error.message);
}
```

**Error locations in UI:**

- Login/Register: Below form
- Profile: Top alert banner
- Squad: Alert banner

---

## 📝 Common Tasks

### Add Login

✅ Already done - see `src/Login.jsx`

### Add Registration

✅ Already done - see `src/Register.jsx`

### Add Profile Page

✅ Already done - see `src/Profile.jsx`

### List Players

✅ Already done - see `src/Pages.jsx` (Squad component)

### Add Player to Squad

🔄 API function ready: `addPlayerToSquad(playerId)`  
📍 Location to implement: `src/Pages.jsx` line 77-79 (button handler)

### Remove Player from Squad

🔄 API function ready: `removePlayerFromSquad(playerId)`  
📍 Location to implement: Create delete button in player card

---

## 🧪 Testing Commands

### Test Login

```
1. Go to http://localhost:3000/login
2. Enter email and password
3. Check localStorage for "authToken"
4. Should redirect to /
```

### Test Register

```
1. Go to http://localhost:3000/register
2. Fill form and submit
3. Check localStorage for "authToken"
4. Should redirect to /
```

### Test Profile

```
1. Go to /profile (after login)
2. Profile data should load
3. Test edit functionality
4. Test logout button
```

### Test Squad

```
1. Go to /squad
2. Players should load from API
3. Check network tab for GET /api/players/
```

---

## 🐛 Debugging

### Check Token

```javascript
// In browser console
console.log(localStorage.getItem("authToken"));
```

### Check API Base URL

```javascript
// In src/api.js
console.log(API_BASE_URL);
```

### Watch Network Calls

1. Open DevTools
2. Go to Network tab
3. Perform API action
4. Click on request and check:
   - Headers (Authorization)
   - Response (status and data)

### Common Issues

**Token not saving?**

- Check browser allows localStorage
- Check response includes "token" field

**401 Unauthorized?**

- Token not being sent
- Token expired
- Token invalid

**404 Not Found?**

- Wrong endpoint URL
- Backend API not running at http://127.0.0.1:8000

**CORS Error?**

- Backend not configured for CORS
- Wrong Origin header

---

## 📚 Documentation Files

1. **API_INTEGRATION_GUIDE.md** - Detailed endpoint docs
2. **API_ENDPOINTS_SUMMARY.md** - Visual mapping
3. **API_QUICK_REFERENCE.md** - This file

---

## 💡 Tips

- Always store token after login/register
- Always remove token on logout
- Check localStorage for debugging
- Watch Network tab in DevTools
- Use console.log for debugging
- Check API response structure in Network tab

---

## 🚨 Important

- **Base URL:** http://127.0.0.1:8000 (configurable in src/api.js)
- **Token:** Stored in localStorage as "authToken"
- **Format:** "Authorization: Bearer {token}"
- **Protected:** Profile, logout, delete, players endpoints need token

---

**Last Updated:** 2026-04-20  
**Status:** All endpoints mapped and integrated ✅
