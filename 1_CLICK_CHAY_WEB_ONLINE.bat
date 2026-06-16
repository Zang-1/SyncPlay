@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"
title SyncPlay - 1 Click
color 0B

echo.
echo   SYNCPLAY - KHOI DONG WEB ONLINE
echo   ================================
echo.

:: Tim Python
set PY=python
%PY% --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 set PY=C:\Users\ADMIN\AppData\Local\Python\pythoncore-3.14-64\python.exe
%PY% --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo   LOI: Khong tim thay Python!
    pause
    exit /b 1
)

:: 1. Chay server an
echo   [1/3] Khoi dong Server...
start /min "" cmd /c "cd /d "%~dp0" && %PY% -m pip install -r requirements.txt --upgrade -q 2>nul && %PY% -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

:: 2. Cho server san sang (8 giay)
echo   [2/3] Cho Server khoi dong (8 giay)...
timeout /t 8 /nobreak >nul
echo   OK!

:: 3. Chay ngrok + mo trinh duyet
echo   [3/3] Tao link Online...
start /b "" "%~dp0ngrok.exe" http 8000 >nul 2>&1
timeout /t 4 /nobreak >nul

for /f "delims=" %%u in ('powershell -Command "(Invoke-RestMethod http://localhost:4040/api/tunnels -EA Stop).tunnels|?{$_.public_url-match'^https://'}|Select -First 1 -Expand public_url"') do (
    echo   Link: %%u
    start "" "%%u"
    goto done
)
echo   Khong lay duoc link ngrok, mo local...
start "" "http://localhost:8000"

:done
echo.
echo   THANH CONG! Nhan phim bat ky de TAT TAT CA...
pause >nul

taskkill /f /im ngrok.exe >nul 2>&1
powershell -Command "Get-NetTCPConnection -LocalPort 8000 -EA 0|%%{Stop-Process -Id $_.OwningProcess -F -EA 0}" >nul 2>&1
