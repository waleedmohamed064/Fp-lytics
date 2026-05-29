# FPL API Connection Troubleshooting Guide

## Issue: "Failed to load FPL data. Please try again later."

Your app is attempting to fetch data from the Fantasy Premier League API but encounters a connection error. Here's how to diagnose and fix it.

---

## 🔍 Step 1: Diagnose the Problem

### Open Browser Developer Tools
1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Type and run:
   ```javascript
   testFPLConnection()
   ```

This will test each proxy service and show you which one works (if any).

### What Each Test Shows:

```
✅ SUCCESS - One of the proxies is working
❌ FAILED - HTTP error (proxy blocked or unavailable)
❌ ERROR - Timeout or network issue
```

---

## 🛠️ Step 2: Solutions by Error Type

### Solution A: If AllOrigins Proxy Works (Test 2) ✅
**Status**: You're all set! 
- Data should load in 5-20 seconds
- Refresh the app: `Ctrl + F5`
- If still showing error, check browser console for specific errors

### Solution B: If Test 3 (CorsProxy.io) Works ✅
**Status**: You're all set!
- Same as Solution A
- Refresh and reload your app

### Solution C: If All Tests Fail ❌

#### Check 1: Internet Connection
- Open any website (Google.com)
- If it works, continue to Check 2
- If it doesn't, you need internet to use this app

#### Check 2: Proxy Services Are Down
- Try accessing in 30 minutes (services may be temporarily unavailable)
- Or try on a different network/WiFi

#### Check 3: Firewall/Network Blocking
If you're at work/school:
- Your network may be blocking these services
- Try using your mobile hotspot or home WiFi
- Contact your network administrator

#### Check 4: Browser Cache
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh the app

---

## 💾 Step 3: Manual API Test

### Test in Console (Copy & Paste):

```javascript
// Test direct FPL API access
fetch('https://fantasy.premierleague.com/api/bootstrap-static/')
  .then(r => r.json())
  .then(d => console.log('✅ Direct access works:', d.elements.length, 'players'))
  .catch(e => console.log('❌ Direct access blocked (CORS):', e.message))

// Test AllOrigins proxy
fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://fantasy.premierleague.com/api/bootstrap-static/'))
  .then(r => r.json())
  .then(d => console.log('✅ AllOrigins works:', d.elements.length, 'players'))
  .catch(e => console.log('❌ AllOrigins failed:', e.message))

// Test CorsProxy.io
fetch('https://corsproxy.io/?https://fantasy.premierleague.com/api/bootstrap-static/')
  .then(r => r.json())
  .then(d => console.log('✅ CorsProxy works:', d.elements.length, 'players'))
  .catch(e => console.log('❌ CorsProxy failed:', e.message))
```

---

## 📋 Detailed Console Log Reference

When you run `testFPLConnection()`, you'll see messages like:

```
🔍 Testing FPL API Connection...

Test 1: Direct FPL API (will likely fail due to CORS)
URL: https://fantasy.premierleague.com/api/bootstrap-s...
❌ ERROR - Access to fetch at 'https://fantasy.premierleague.com/...' 
   from origin has been blocked by CORS policy

Test 2: AllOrigins Proxy
URL: https://api.allorigins.win/raw?url=...
✅ SUCCESS (2453ms)
   - Received 599 players
   - Received 20 teams

✅ AllOrigins proxy works! Data should load now.
```

---

## 🚀 Alternative: Use Your Own Backend

If proxies keep failing, create a simple Node.js backend:

### Express Backend (server.js):
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/fpl/bootstrap', async (req, res) => {
  try {
    const response = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
```

### Update API in app:
```javascript
const FPL_API_BASE = "http://localhost:5000/api/fpl";

export const getFPLBootstrapData = async () => {
  const response = await fetch(`${FPL_API_BASE}/bootstrap`);
  return response.json();
};
```

---

## ✅ How to Know It's Fixed

1. Open Home page
2. You should see:
   - ✅ Gameweek number loaded
   - ✅ Top 5 players displayed
   - ✅ Stats showing real data
   - ✅ "View Full FPL Data" button
3. Click "FPL Data" in sidebar
4. You should see:
   - ✅ Overview with all players/teams
   - ✅ Players tab with 500+ players
   - ✅ Teams tab with standings
   - ✅ Fixtures tab with matches

---

## 🆘 Still Having Issues?

### Collect Debug Info:

Open Console (F12) and copy the output of:
```javascript
console.log({
  url: window.location.href,
  userAgent: navigator.userAgent,
  online: navigator.onLine,
});
testFPLConnection();
```

Share this output when asking for help.

---

## 📞 Quick Fix Checklist

- [ ] Tried refreshing page (Ctrl+F5)
- [ ] Opened Console (F12) and ran `testFPLConnection()`
- [ ] Cleared browser cache (Ctrl+Shift+Delete)
- [ ] Checked internet connection
- [ ] Waited 30 minutes and tried again
- [ ] Tried on different WiFi/network
- [ ] Checked for network firewall blocks
- [ ] Browser is up to date (Chrome/Firefox/Safari/Edge)

---

## Expected Load Times

- **First Load**: 5-20 seconds (data size ~10MB)
- **Subsequent Loads**: 2-5 seconds (cache)
- **FPL Data Dashboard**: 3-8 seconds (loading 500+ players)

If loading takes longer than 30 seconds, there's likely a network issue.

---

**Last Updated**: May 2026
