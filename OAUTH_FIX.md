# Google OAuth Configuration Fix

## Problem
After Google OAuth authentication, the redirect goes to `http://127.0.0.1:3000/oauth` instead of the current running port (4173), causing a 404 error.

## Solution Steps

### 1. Update Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: APIs & Services → Credentials
3. Find your OAuth 2.0 Client ID
4. Click on it to edit
5. Under "Authorized redirect URIs", update:
   - Remove: `http://127.0.0.1:3000/oauth`
   - Add: `http://localhost:4173/oauth`
6. Save the changes

### 2. Backend Configuration (Already Fixed)
The backend server.js has been updated to use the correct redirect URI:
```javascript
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:4173/oauth';
```

### 3. Environment Variables
Add this to your .env file:
```bash
REDIRECT_URI=http://localhost:4173/oauth
```

### 4. Port-Specific Configurations
For different development ports, update the redirect URI accordingly:

| Port | Redirect URI |
|------|-------------|
| 3000 | http://localhost:3000/oauth |
| 4173 | http://localhost:4173/oauth |
| 5173 | http://localhost:5173/oauth |

### 5. Docker Configuration
For Docker deployment, the redirect URI should be:
```bash
REDIRECT_URI=http://localhost/oauth
```

## Quick Fix for Current Setup
Since you're running on port 4173, update your Google OAuth redirect URI to:
```
http://localhost:4173/oauth
```

## Testing
1. After updating the redirect URI in Google Cloud Console
2. Restart the backend server
3. Try Google OAuth login again
4. It should redirect to the correct port and complete authentication

## Alternative: Use Local Email/Password
If Google OAuth setup is taking too long, you can use the default login:
- Email: admin@example.com
- Password: password123

## Notes
- Google OAuth changes can take a few minutes to propagate
- Make sure the redirect URI exactly matches (no trailing slashes)
- Use http://localhost instead of http://127.0.0.1 for consistency
