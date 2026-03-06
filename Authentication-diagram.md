# Authentication Flow Diagram

## 🔐 Complete Authentication Flow

### Overview
This document shows the complete authentication flow for both Email/Password and Google OAuth authentication.

---

## 📊 Flow Diagram 1: Email/Password Authentication

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER OPENS APP                              │
│                    http://localhost:5173                            │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                        LOGIN PAGE                                   │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  Email: [________________]                                    │ │
│  │  Password: [________________]                                 │ │
│  │  [Sign In Button]                                             │ │
│  │  ─────────── Or continue with ───────────                     │ │
│  │  [Continue with Google Button]                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ User enters email & password
                             │ Clicks "Sign In"
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Login.tsx)                             │
│  - Collects form data                                               │
│  - Calls: POST /api/auth/login                                      │
│  - Sends: { email, password }                                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ HTTP POST Request
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND (server.js)                              │
│  POST /api/auth/login                                               │
│  - Receives: { email, password }                                    │
│  - Validates credentials                                            │
│  - Finds user in database                                           │
│  - Generates JWT token                                              │
│  - Returns: { token, user }                                         │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Response: { token, user }
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Login.tsx)                             │
│  - Receives token and user data                                     │
│  - Calls: login(token, user)                                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                  AUTH CONTEXT (AuthContext.tsx)                     │
│  - Stores token in localStorage                                     │
│  - Stores user data in localStorage                                 │
│  - Updates auth state: isAuthenticated = true                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ navigate('/dashboard')
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    PRIVATE ROUTE CHECK                              │
│  - Checks: isAuthenticated === true?                                │
│  - YES: Allow access to Dashboard                                   │
│  - NO: Redirect to /login                                           │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ isAuthenticated = true
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      EMPLOYEE DASHBOARD                             │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  Welcome, [User Name]                          [Logout]       │ │
│  │  ─────────────────────────────────────────────────────────────│ │
│  │  Total Employees: 2    Active: 2    Departments: 2           │ │
│  │  ─────────────────────────────────────────────────────────────│ │
│  │  Employee List                          [+ Add Employee]      │ │
│  │  [John Doe] [Jane Smith]                                      │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Flow Diagram 2: Google OAuth Authentication

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER OPENS APP                              │
│                    http://localhost:5173                            │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                        LOGIN PAGE                                   │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  Email: [________________]                                    │ │
│  │  Password: [________________]                                 │ │
│  │  [Sign In Button]                                             │ │
│  │  ─────────── Or continue with ───────────                     │ │
│  │  [🔵 Continue with Google Button] ← USER CLICKS HERE         │ │
│  └───────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ User clicks "Continue with Google"
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                  FRONTEND (GoogleAuth.tsx)                          │
│  - Sets loading state                                               │
│  - Redirects to: http://localhost:5000/api/auth/google             │
│  - window.location.href = 'http://localhost:5000/api/auth/google'  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Browser redirects to backend
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND (server.js)                              │
│  GET /api/auth/google                                               │
│  - Generates Google OAuth URL                                       │
│  - Includes:                                                        │
│    • client_id                                                      │
│    • redirect_uri: http://localhost:5000/api/auth/google/callback  │
│    • scope: email, profile                                          │
│  - Redirects browser to Google                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Browser redirects to Google
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    GOOGLE ACCOUNT SELECTION                         │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  Choose an account                                            │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │  👤 user@gmail.com                                      │ │ │
│  │  │     User Name                                           │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │  👤 another@gmail.com                                   │ │ │
│  │  │     Another User                                        │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  │  [Use another account]                                        │ │
│  └───────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ User selects account
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    GOOGLE PERMISSION SCREEN                         │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  Employee Management System wants to:                         │ │
│  │  ✓ View your email address                                   │ │
│  │  ✓ View your basic profile info                              │ │
│  │                                                               │ │
│  │  [Cancel]                              [Allow]               │ │
│  └───────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ User clicks "Allow"
                             │ Google generates authorization code
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    GOOGLE REDIRECTS TO BACKEND                      │
│  Redirects to:                                                      │
│  http://localhost:5000/api/auth/google/callback?code=XXXXX         │
│                                                                     │
│  ⚠️ THIS IS WHERE redirect_uri_mismatch ERROR OCCURS IF NOT       │
│     CONFIGURED IN GOOGLE CLOUD CONSOLE!                            │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Backend receives authorization code
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND (server.js)                              │
│  GET /api/auth/google/callback?code=XXXXX                          │
│  1. Receives authorization code                                     │
│  2. Exchanges code for access token (calls Google API)              │
│  3. Uses access token to get user info from Google:                 │
│     - email                                                         │
│     - name                                                          │
│     - picture                                                       │
│  4. Checks if user exists in database                               │
│     - If NO: Creates new user                                       │
│     - If YES: Uses existing user                                    │
│  5. Generates JWT token                                             │
│  6. Redirects to frontend with token and user data                  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Redirects to frontend
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND OAUTH CALLBACK                          │
│  http://localhost:5173/oauth?token=XXX&user=YYY                    │
│                                                                     │
│  OAuthCallback.tsx:                                                 │
│  1. Extracts token and user from URL                                │
│  2. Calls: login(token, user)                                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                  AUTH CONTEXT (AuthContext.tsx)                     │
│  - Stores token in localStorage                                     │
│  - Stores user data in localStorage                                 │
│  - Updates auth state: isAuthenticated = true                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ navigate('/dashboard')
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    PRIVATE ROUTE CHECK                              │
│  - Checks: isAuthenticated === true?                                │
│  - YES: Allow access to Dashboard                                   │
│  - NO: Redirect to /login                                           │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ isAuthenticated = true
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      EMPLOYEE DASHBOARD                             │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  Welcome, [Google User Name]  👤 [Profile Pic]  [Logout]     │ │
│  │  ─────────────────────────────────────────────────────────────│ │
│  │  Total Employees: 2    Active: 2    Departments: 2           │ │
│  │  ─────────────────────────────────────────────────────────────│ │
│  │  Employee List                          [+ Add Employee]      │ │
│  │  [John Doe] [Jane Smith]                                      │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Flow Diagram 3: Session Persistence (Page Refresh)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    USER REFRESHES PAGE (F5)                         │
│                    While on Dashboard                               │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    APP RELOADS (App.tsx)                            │
│  - AuthProvider initializes                                         │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                  AUTH CONTEXT (AuthContext.tsx)                     │
│  useEffect runs on mount:                                           │
│  1. Checks localStorage for 'token'                                 │
│  2. Checks localStorage for 'user'                                  │
│  3. If both exist:                                                  │
│     - setToken(storedToken)                                         │
│     - setUser(storedUser)                                           │
│     - isAuthenticated = true                                        │
│  4. If not exist:                                                   │
│     - isAuthenticated = false                                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    PRIVATE ROUTE CHECK                              │
│  - Checks: isAuthenticated === true?                                │
│  - YES: Stay on Dashboard ✅                                        │
│  - NO: Redirect to /login                                           │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ isAuthenticated = true
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      EMPLOYEE DASHBOARD                             │
│  User stays on Dashboard - No redirect to login! ✅                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Flow Diagram 4: Logout Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                      EMPLOYEE DASHBOARD                             │
│  User clicks [Logout] button                                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    DASHBOARD (Dashboard.tsx)                        │
│  handleLogout() called:                                             │
│  - Calls: logout()                                                  │
│  - Calls: navigate('/login')                                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                  AUTH CONTEXT (AuthContext.tsx)                     │
│  logout() function:                                                 │
│  - localStorage.removeItem('token')                                 │
│  - localStorage.removeItem('user')                                  │
│  - setToken(null)                                                   │
│  - setUser(null)                                                    │
│  - isAuthenticated = false                                          │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ navigate('/login')
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                        LOGIN PAGE                                   │
│  User is logged out and back at login page ✅                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Flow Diagram 5: Protected Route Access (Unauthorized)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    USER NOT LOGGED IN                               │
│  Tries to access: http://localhost:5173/dashboard                  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    PRIVATE ROUTE (PrivateRoute.tsx)                 │
│  - Checks: isAuthenticated === true?                                │
│  - Result: isAuthenticated = false ❌                               │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ Not authenticated
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    REDIRECT TO LOGIN                                │
│  <Navigate to="/login" replace />                                   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────────────┐
│                        LOGIN PAGE                                   │
│  User must login to access Dashboard ✅                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔑 Key Components

### Frontend Components
1. **Login.tsx** - Login form with email/password
2. **GoogleAuth.tsx** - Google OAuth button
3. **OAuthCallback.tsx** - Handles OAuth redirect
4. **Dashboard.tsx** - Main dashboard (protected)
5. **PrivateRoute.tsx** - Route protection wrapper
6. **AuthContext.tsx** - Authentication state management

### Backend Endpoints
1. **POST /api/auth/login** - Email/password authentication
2. **GET /api/auth/google** - Initiates Google OAuth
3. **GET /api/auth/google/callback** - Handles OAuth callback
4. **GET /api/employees** - Get employees (requires auth)

### Storage
- **localStorage.token** - JWT authentication token
- **localStorage.user** - User data (id, username, email, picture)

---

## ⚠️ Critical Configuration

### Google Cloud Console Must Have:

**Authorized JavaScript origins:**
```
http://localhost:5173
http://localhost:5000
```

**Authorized redirect URIs:**
```
http://localhost:5000/api/auth/google/callback
```

**If this is not configured, you get:**
```
Error 400: redirect_uri_mismatch
```

---

## ✅ Success Indicators

### Authentication Working:
1. ✅ Click "Continue with Google" → Google account selection
2. ✅ Select account → Redirected to Dashboard
3. ✅ See user name/email in Dashboard header
4. ✅ Refresh page → Stay on Dashboard
5. ✅ Logout → Redirected to login
6. ✅ Try /dashboard without login → Redirected to login

---

**This is the complete authentication flow for your Employee Management System!**
