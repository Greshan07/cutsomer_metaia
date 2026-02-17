@echo off
echo Starting ngrok tunnels for METAIA Tailor App...
echo.
echo Make sure both servers are running:
echo - Backend: http://localhost:5000
echo - Frontend: http://localhost:3000
echo.
echo Starting backend tunnel...
start "ngrok-backend" ngrok http 5000
timeout /t 5
echo.
echo Starting frontend tunnel...
start "ngrok-frontend" ngrok http 3000
echo.
echo Open the ngrok windows to see your public URLs!
echo Update .env file with the backend ngrok URL
pause
