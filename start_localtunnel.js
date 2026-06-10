const localtunnel = require('localtunnel');
const { exec } = require('child_process');

(async () => {
    try {
        console.log("\n[2/2] Đang lấy đường link mới... Xin chờ vài giây.");
        
        // Localtunnel đôi khi mất vài giây để kết nối
        const tunnel = await localtunnel({ port: 8000 });
        
        console.log("\n==============================================");
        console.log(">> HOÀN TẤT! ĐƯỜNG LINK ONLINE CỦA BẠN LÀ:");
        console.log(">> " + tunnel.url);
        console.log("==============================================\n");
        console.log("Trình duyệt đang tự động mở...");

        // Mở trình duyệt (chỉ dùng cho Windows)
        exec(`start "" "${tunnel.url}"`);

        tunnel.on('close', () => {
            console.log("Đã ngắt kết nối đường truyền.");
        });
    } catch (err) {
        console.error("Lỗi khi tạo đường truyền:", err.message);
        console.log("Nếu lỗi này tiếp diễn, máy chủ Localtunnel có thể đang bảo trì.");
    }
})();
