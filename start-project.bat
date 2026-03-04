@echo off
echo Starting Employee Management System...
echo.

echo Starting Backend Server...
cd /d "d:\Desktop\new employee"
start "Backend Server" cmd /k "npm start"

echo.
echo Starting Frontend Server...
cd /d "d:\Desktop\new employee\ts-dashboard"
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause
