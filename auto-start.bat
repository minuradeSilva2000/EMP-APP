@echo off
echo ========================================
echo Employee Management System - Auto Start
echo ========================================
echo.

echo [1/3] Starting Backend Server...
cd /d "d:\Desktop\new employee"
start "Backend Server" cmd /k "npm start"

echo.
echo [2/3] Waiting for backend to initialize...
timeout /t 3 /nobreak >nul

echo.
echo [3/3] Starting Frontend Application...
cd /d "d:\Desktop\new employee\ts-dashboard"
start "Frontend Server" cmd /k "npm run preview"

echo.
echo ========================================
echo Starting complete! Both servers are launching...
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:4173
echo.
echo Login Credentials:
echo Email: admin@example.com
echo Password: password123
echo.
echo The application will be ready in a few seconds.
echo ========================================
echo.

timeout /t 5 /nobreak >nul
echo Opening application in browser...
start http://localhost:4173

echo.
echo Auto-start complete! Application is running.
echo Press any key to exit this window...
pause >nul
