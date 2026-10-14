@echo off
REM Starts Jeremy Clothing on a local server so it can be installed as an app.
REM Keep this window open while using the app. Press Ctrl+C to stop.
cd /d "%~dp0"
echo.
echo   Jeremy Clothing is running at http://localhost:8000
echo   In Chrome or Edge, click "Install the Jeremy App" (bottom right),
echo   or the install icon at the right end of the address bar.
echo.
start "" http://localhost:8000/index.html
python -m http.server 8000
