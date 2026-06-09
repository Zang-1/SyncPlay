@echo off
echo ==============================================
echo Starting SyncPlay Server Setup...
echo ==============================================

set PYTHON_CMD=python
%PYTHON_CMD% --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    set PYTHON_CMD=C:\Users\ADMIN\AppData\Local\Python\pythoncore-3.14-64\python.exe
)

%PYTHON_CMD% --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo "ERROR: Python is not installed or not found. Please install Python."
    pause
    exit /b 1
)

echo Using Python: %PYTHON_CMD%
echo Installing dependencies...
%PYTHON_CMD% -m pip install -r requirements.txt --upgrade

echo.
echo ==============================================
echo Starting SyncPlay Server...
echo API is available at http://localhost:8000
echo Frontend is available at http://localhost:8000/static/index.html
echo ==============================================
%PYTHON_CMD% -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
