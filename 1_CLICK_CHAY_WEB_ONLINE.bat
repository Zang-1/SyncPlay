@echo off
echo ==============================================
echo   KHOI DONG WEB VA MO KET NOI ONLINE (NGROK)
echo ==============================================

echo [1/2] Dang bat Server Web...
start "SyncPlay Local Server" cmd /c "run.bat"

echo.
echo [2/2] Dang tao duong truyen Ngrok...
echo ==============================================
echo CHU Y: Mot cua so moi se hien ra.
echo Hay tim dong chu co dang "Forwarding   https://.......ngrok-free.app"
echo Do chinh la link web cua ban!
echo ==============================================

start "Ket Noi Online Ngrok" cmd /c "ngrok.exe http 8000"
