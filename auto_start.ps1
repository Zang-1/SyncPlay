$OutputEncoding = [Console]::OutputEncoding = [Text.Encoding]::UTF8

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "  KHỞI ĐỘNG WEB VÀ MỞ KẾT NỐI ONLINE (1-CLICK)" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

Write-Host "[1/2] Đang bật Server Web... (Cửa sổ thứ 2 sẽ tự động mở)" -ForegroundColor Yellow
Start-Process "cmd.exe" -ArgumentList "/c run.bat" -WindowStyle Normal

Write-Host "[2/2] Đang tạo đường dẫn Online và chờ lấy link..." -ForegroundColor Yellow
Write-Host "Trình duyệt sẽ TỰ ĐỘNG MỞ khi tạo xong link!" -ForegroundColor Green
Write-Host "----------------------------------------------"

$opened = $false
& .\cloudflared.exe tunnel --url http://localhost:8000 2>&1 | ForEach-Object {
    $line = $_.ToString()
    Write-Host $line
    
    if (-not $opened -and $line -match "(https://[a-zA-Z0-9-]+\.trycloudflare\.com)") {
        $url = $matches[1]
        Write-Host ""
        Write-Host "==============================================" -ForegroundColor Green
        Write-Host ">> TÌM THẤY LINK: $url" -ForegroundColor Green
        Write-Host ">> ĐANG CHỜ 3 GIÂY ĐỂ ĐỒNG BỘ MẠNG TRƯỚC KHI MỞ..." -ForegroundColor Yellow
        Write-Host "==============================================" -ForegroundColor Green
        Write-Host ""
        
        # Đợi 3 giây để DNS của Cloudflare kịp cập nhật
        Start-Sleep -Seconds 3
        
        # Mở link bằng trình duyệt mặc định
        Start-Process $url
        $opened = $true
    }
}
