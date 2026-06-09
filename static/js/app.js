const app = {
    state: {
        token: localStorage.getItem('syncplay_token'),
        username: localStorage.getItem('syncplay_username'),
        userId: localStorage.getItem('syncplay_userId'),
        isAdmin: localStorage.getItem('syncplay_isAdmin') === 'true',
        isLoginMode: true, // Auth view mode: true = login, false = register
        currentUploadTab: 'LOCAL',
        currentMediaId: null
    },

    init() {
        this.updateNav();
        // Simple router based on hash
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    },

    showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${isError ? 'error' : ''} show`;
        setTimeout(() => {
            toast.className = `toast ${isError ? 'error' : ''}`;
        }, 3000);
    },

    showLoader(show) {
        document.getElementById('globalLoader').className = show ? 'loader active' : 'loader';
    },

    navigate(view, param = null) {
        window.location.hash = param ? `${view}/${param}` : view;
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const parts = hash.split('/');
        const view = parts[0];
        const param = parts[1];

        // Hide all views
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        
        // Stop playing media when navigating away from watch page
        if (view !== 'watch') {
            const playerContainer = document.getElementById('playerContainer');
            if (playerContainer) {
                playerContainer.innerHTML = '';
            }
        }

        // Show target view
        const viewEl = document.getElementById(`view-${view}`);
        if (viewEl) {
            viewEl.classList.add('active');
            this.executeViewLogic(view, param);
        } else {
            this.navigate('home');
        }
    },

    executeViewLogic(view, param) {
        if (view === 'home') {
            this.loadTrending();
        } else if (view === 'watch' && param) {
            this.loadWatchData(param);
        } else if (view === 'upload') {
            if (!this.state.token) {
                this.showToast('Vui lòng đăng nhập để tải lên', true);
                this.navigate('auth');
            }
        } else if (view === 'admin') {
            if (!this.state.isAdmin) {
                this.navigate('home');
            } else {
                this.loadAdminSettings();
                this.loadAdminUsers();
            }
        } else if (view === 'admin-media' && param) {
            if (!this.state.isAdmin) {
                this.navigate('home');
            } else {
                this.loadAdminUserMedia(param);
            }
        }
    },

    updateNav() {
        const authItems = document.getElementById('navAuthItems');
        const guestItems = document.getElementById('navGuestItems');
        const usernameEl = document.getElementById('navUsername');
        
        if (this.state.token) {
            authItems.style.display = 'flex';
            authItems.style.alignItems = 'center';
            authItems.style.gap = '1rem';
            guestItems.style.display = 'none';
            usernameEl.textContent = `Xin chào, ${this.state.username}`;
            document.getElementById('currentUserAvatar').textContent = this.state.username.charAt(0).toUpperCase();
            document.getElementById('navAdminBtn').style.display = this.state.isAdmin ? 'block' : 'none';
        } else {
            authItems.style.display = 'none';
            guestItems.style.display = 'block';
            document.getElementById('navAdminBtn').style.display = 'none';
        }
    },

    /* ================= AUTHENTICATION ================= */
    toggleAuthMode() {
        this.state.isLoginMode = !this.state.isLoginMode;
        document.getElementById('authTitle').textContent = this.state.isLoginMode ? 'Đăng nhập' : 'Đăng ký';
        document.getElementById('authSubmitBtn').textContent = this.state.isLoginMode ? 'Đăng nhập' : 'Đăng ký';
        document.getElementById('authSwitchText').textContent = this.state.isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?';
        document.getElementById('authSwitchLink').textContent = this.state.isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập';
    },

    async handleAuth(event) {
        event.preventDefault();
        const username = document.getElementById('authUsername').value;
        const password = document.getElementById('authPassword').value;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        this.showLoader(true);
        try {
            const url = this.state.isLoginMode ? '/api/auth/login' : '/api/auth/register';
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (response.ok) {
                if (this.state.isLoginMode) {
                    // Login success
                    localStorage.setItem('syncplay_token', data.access_token);
                    localStorage.setItem('syncplay_username', data.username);
                    localStorage.setItem('syncplay_userId', data.user_id);
                    localStorage.setItem('syncplay_isAdmin', data.is_admin);
                    this.state.token = data.access_token;
                    this.state.username = data.username;
                    this.state.userId = data.user_id;
                    this.state.isAdmin = data.is_admin;
                    this.updateNav();
                    this.navigate('home');
                    this.showToast('Đăng nhập thành công!');
                } else {
                    // Register success
                    this.showToast('Đăng ký thành công! Vui lòng đăng nhập.');
                    this.toggleAuthMode();
                    document.getElementById('authPassword').value = '';
                }
            } else {
                this.showToast(data.detail || 'Có lỗi xảy ra', true);
            }
        } catch (error) {
            this.showToast('Không thể kết nối đến server', true);
        } finally {
            this.showLoader(false);
        }
    },

    logout() {
        localStorage.removeItem('syncplay_token');
        localStorage.removeItem('syncplay_username');
        localStorage.removeItem('syncplay_userId');
        localStorage.removeItem('syncplay_isAdmin');
        this.state.token = null;
        this.state.username = null;
        this.state.userId = null;
        this.state.isAdmin = false;
        this.updateNav();
        this.navigate('home');
        this.showToast('Đã đăng xuất');
    },

    /* ================= HOME & MEDIA ================= */
    async loadTrending() {
        this.showLoader(true);
        try {
            const response = await fetch('/api/media/trending');
            if(response.ok) {
                const data = await response.json();
                this.renderMediaGrid(data);
            }
        } catch(e) {
            console.error(e);
        } finally {
            this.showLoader(false);
        }
    },

    renderMediaGrid(mediaList) {
        const grid = document.getElementById('trendingGrid');
        grid.innerHTML = '';

        if (mediaList.length === 0) {
            grid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1;">Chưa có video nào. Hãy là người đầu tiên tải lên!</p>';
            return;
        }

        mediaList.forEach(m => {
            const card = document.createElement('div');
            card.className = 'media-card';
            card.onclick = () => this.navigate('watch', m.id);

            let badgeClass = m.sourceType === 'LOCAL' ? 'badge-local' : (m.sourceType === 'YOUTUBE' ? 'badge-youtube' : 'badge-spotify');
            
            let thumbnailContent = '';
            if (m.sourceType === 'YOUTUBE') {
                const ytId = m.resource.split('v=')[1]?.split('&')[0] || m.resource.split('/').pop();
                thumbnailContent = `<img src="https://img.youtube.com/vi/${ytId}/maxresdefault.jpg" style="width:100%;height:100%;object-fit:cover;">`;
            } else {
                thumbnailContent = `
                <div style="width:100%; height:100%; background: linear-gradient(135deg, #1e1b4b, #3b82f6); display: flex; align-items: center; justify-content: center;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.8;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>`;
            }
            
            card.innerHTML = `
                <div class="media-card-thumbnail">
                    <span class="media-source-badge ${badgeClass}">${m.sourceType}</span>
                    ${thumbnailContent}
                </div>
                <div class="media-card-content">
                    <div class="media-card-title" title="${m.title}">${m.title}</div>
                    <div class="media-card-meta">
                        <span>${m.channelName}</span>
                        <span>${m.views} lượt xem</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    },

    /* ================= UPLOAD ================= */
    switchUploadTab(tab) {
        this.state.currentUploadTab = tab;
        document.getElementById('tabLocal').className = tab === 'LOCAL' ? 'btn' : 'btn btn-secondary';
        document.getElementById('tabLink').className = tab === 'LINK' ? 'btn' : 'btn btn-secondary';
        
        document.getElementById('localUploadArea').style.display = tab === 'LOCAL' ? 'block' : 'none';
        document.getElementById('linkUploadArea').style.display = tab === 'LINK' ? 'block' : 'none';
        
        // Remove required attributes dynamically
        document.getElementById('uploadFile').required = tab === 'LOCAL';
        document.getElementById('uploadUrl').required = tab === 'LINK';
    },

    async handleUpload(event) {
        event.preventDefault();
        const title = document.getElementById('uploadTitle').value;
        const formData = new FormData();
        formData.append('title', title);

        let url = '';
        
        if (this.state.currentUploadTab === 'LOCAL') {
            const file = document.getElementById('uploadFile').files[0];
            if(!file) return this.showToast('Vui lòng chọn file', true);
            formData.append('file', file);
            url = '/api/media/upload';
        } else {
            const sourceType = document.getElementById('uploadSourceType').value;
            const linkUrl = document.getElementById('uploadUrl').value;
            formData.append('source_type', sourceType);
            formData.append('url', linkUrl);
            url = '/api/media/link';
        }

        this.showLoader(true);
        document.getElementById('btnSubmitUpload').disabled = true;
        document.getElementById('btnSubmitUpload').textContent = 'Đang tải lên...';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                },
                body: formData
            });

            const data = await response.json();
            if (response.ok) {
                this.showToast('Tải lên thành công!');
                document.getElementById('uploadForm').reset();
                this.navigate('home');
            } else {
                this.showToast(data.detail || 'Lỗi tải lên', true);
            }
        } catch (e) {
            this.showToast('Không thể kết nối đến server', true);
        } finally {
            this.showLoader(false);
            document.getElementById('btnSubmitUpload').disabled = false;
            document.getElementById('btnSubmitUpload').textContent = 'Tải lên';
        }
    },

    /* ================= WATCH & INTERACT ================= */
    async loadWatchData(mediaId) {
        this.state.currentMediaId = mediaId;
        this.showLoader(true);
        
        try {
            // Get Details
            const res = await fetch(`/api/media/details/${mediaId}`);
            if(!res.ok) {
                this.navigate('home');
                return this.showToast('Video không tồn tại', true);
            }
            
            const media = await res.json();
            
            // Update Info UI
            document.getElementById('watchTitle').textContent = media.Title;
            document.getElementById('watchChannelName').textContent = media.ChannelName;
            document.getElementById('watchAvatar').textContent = media.ChannelName.charAt(0).toUpperCase();
            document.getElementById('watchViews').textContent = media.ViewsCount;
            document.getElementById('watchLikes').textContent = media.TotalLikes || 0;
            document.getElementById('watchDislikes').textContent = media.TotalDislikes || 0;
            document.getElementById('commentCount').textContent = media.TotalComments || 0;
            
            // Show Delete button if owner or admin
            const btnDelete = document.getElementById('btnDeleteMedia');
            if (this.state.username === media.ChannelName || this.state.isAdmin) {
                btnDelete.style.display = 'inline-block';
            } else {
                btnDelete.style.display = 'none';
            }

            const date = new Date(media.UploadDate);
            document.getElementById('watchDate').textContent = date.toLocaleDateString('vi-VN');

            // Render Player
            const playerContainer = document.getElementById('playerContainer');
            playerContainer.className = 'player-wrapper'; // reset class
            
            if (media.SourceType === 'LOCAL') {
                playerContainer.innerHTML = `
                    <video controls autoplay>
                        <source src="/api/media/stream/${media.MediaID}" type="video/mp4">
                    </video>`;
            } else if (media.SourceType === 'YOUTUBE') {
                playerContainer.innerHTML = `
                    <iframe src="${media.MediaResource}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            } else if (media.SourceType === 'SPOTIFY') {
                playerContainer.className += ' spotify-player';
                playerContainer.innerHTML = `
                    <iframe src="${media.MediaResource}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
            }

            // Load comments
            this.loadComments(mediaId);

        } catch (e) {
            console.error(e);
        } finally {
            this.showLoader(false);
        }
    },

    async deleteMedia() {
        if (!confirm('Bạn có chắc chắn muốn xóa video này? Hành động này không thể hoàn tác.')) return;
        
        this.showLoader(true);
        try {
            const res = await fetch(`/api/media/${this.state.currentMediaId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${this.state.token}` }
            });
            if (res.ok) {
                this.showToast('Đã xóa video');
                this.navigate('home');
            } else {
                const data = await res.json();
                this.showToast(data.detail || 'Không thể xóa video', true);
            }
        } catch(e) {
            this.showToast('Có lỗi xảy ra', true);
        } finally {
            this.showLoader(false);
        }
    },

    async toggleLike(isLike) {
        if(!this.state.token) return this.showToast('Vui lòng đăng nhập để tương tác', true);
        
        const formData = new FormData();
        formData.append('media_id', this.state.currentMediaId);
        formData.append('is_like', isLike);

        try {
            const res = await fetch('/api/interact/like', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${this.state.token}` },
                body: formData
            });
            if(res.ok) {
                // Tải lại chi tiết để cập nhật số đếm chính xác
                this.loadWatchData(this.state.currentMediaId);
            }
        } catch(e) {}
    },

    async toggleSubscribe() {
        if(!this.state.token) return this.showToast('Vui lòng đăng nhập để Đăng ký', true);
        
        // Cần truyền channel_id. Tạm thời gọi API GetDetails để lấy ChannelUserID?
        // Do SP_GetMediaDetails không trả về ChannelUserID, nên tôi sẽ dùng cách đơn giản: hiển thị toast
        // Trong thực tế cần có ChannelID
        this.showToast('Tính năng đăng ký đang được cập nhật thêm backend support');
    },

    async loadComments(mediaId) {
        const res = await fetch(`/api/comments/${mediaId}`);
        if(res.ok) {
            const comments = await res.json();
            const list = document.getElementById('commentList');
            list.innerHTML = '';
            comments.forEach(c => {
                list.innerHTML += `
                    <div class="comment-item">
                        <div class="comment-avatar">${c.username.charAt(0).toUpperCase()}</div>
                        <div class="comment-content">
                            <h4>${c.username}</h4>
                            <p>${c.content}</p>
                        </div>
                    </div>
                `;
            });
        }
    },

    async postComment(event) {
        event.preventDefault();
        if(!this.state.token) {
            this.showToast('Vui lòng đăng nhập để bình luận', true);
            return;
        }

        const input = document.getElementById('commentInput');
        const content = input.value;
        
        const formData = new FormData();
        formData.append('media_id', this.state.currentMediaId);
        formData.append('content', content);

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${this.state.token}` },
                body: formData
            });
            if(res.ok) {
                input.value = '';
                this.loadComments(this.state.currentMediaId);
                const countEl = document.getElementById('commentCount');
                countEl.textContent = parseInt(countEl.textContent) + 1;
            }
        } catch(e) {}
    },

    /* ================= ADMIN ================= */
    async loadAdminSettings() {
        this.showLoader(true);
        try {
            const res = await fetch('/api/admin/settings', {
                headers: { 'Authorization': `Bearer ${this.state.token}` }
            });
            if (res.ok) {
                const data = await res.json();
                document.getElementById('adminMaxAccounts').value = data.max_total_accounts;
                document.getElementById('adminMaxUploads').value = data.max_uploads_per_user;
            } else {
                this.showToast('Không có quyền truy cập Admin', true);
                this.navigate('home');
            }
        } catch (e) {
            console.error(e);
        } finally {
            this.showLoader(false);
        }
    },

    async saveAdminSettings(event) {
        event.preventDefault();
        const maxAcc = parseInt(document.getElementById('adminMaxAccounts').value);
        const maxUp = parseInt(document.getElementById('adminMaxUploads').value);

        document.getElementById('btnSaveAdmin').disabled = true;
        document.getElementById('btnSaveAdmin').textContent = 'Đang lưu...';

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${this.state.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    max_total_accounts: maxAcc,
                    max_uploads_per_user: maxUp
                })
            });

            if (res.ok) {
                this.showToast('Đã lưu cài đặt!');
            } else {
                this.showToast('Có lỗi xảy ra', true);
            }
        } catch (e) {
            this.showToast('Không thể kết nối đến server', true);
        } finally {
            document.getElementById('btnSaveAdmin').disabled = false;
            document.getElementById('btnSaveAdmin').textContent = 'Lưu Cài Đặt';
        }
    },

    async loadAdminUsers() {
        try {
            const res = await fetch('/api/admin/users', {
                headers: { 'Authorization': `Bearer ${this.state.token}` }
            });
            if (res.ok) {
                const users = await res.json();
                const tbody = document.getElementById('adminUsersBody');
                tbody.innerHTML = '';
                users.forEach(u => {
                    if (u.Username === this.state.username) return; // Hide self
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><input type="checkbox" class="user-checkbox" value="${u.Username}" onchange="app.updateDeleteSelectedCount()"></td>
                        <td>${u.Username} ${u.IsAdmin ? '<span style="color:var(--primary-color)">(Admin)</span>' : ''}</td>
                        <td>${u.TotalUploads}</td>
                        <td>${u.TotalLikesReceived}</td>
                        <td>${u.TotalDislikesReceived}</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 0.2rem 0.5rem; margin-right: 0.5rem;" onclick="app.navigate('admin-media', '${u.Username}')">Xem Video</button>
                            <button class="btn btn-secondary" style="color: #ef4444; border-color: #ef4444; padding: 0.2rem 0.5rem;" onclick="app.deleteUser('${u.Username}')">Xóa</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
                this.updateDeleteSelectedCount();
                document.getElementById('selectAllUsers').checked = false;
            }
        } catch(e) {
            console.error(e);
        }
    },

    toggleSelectAllUsers() {
        const selectAll = document.getElementById('selectAllUsers').checked;
        const checkboxes = document.querySelectorAll('.user-checkbox');
        checkboxes.forEach(cb => cb.checked = selectAll);
        this.updateDeleteSelectedCount();
    },

    updateDeleteSelectedCount() {
        const checkedCount = document.querySelectorAll('.user-checkbox:checked').length;
        document.getElementById('btnDeleteSelected').textContent = `Xóa Đã Chọn (${checkedCount})`;
    },

    async deleteUser(username) {
        if (!confirm(`CẢNH BÁO: Bạn chuẩn bị XÓA VĨNH VIỄN tài khoản "${username}". Bạn có chắc không?`)) return;
        this._executeBatchDelete([username]);
    },

    async deleteSelectedUsers() {
        const checkboxes = document.querySelectorAll('.user-checkbox:checked');
        const usernames = Array.from(checkboxes).map(cb => cb.value);
        if (usernames.length === 0) {
            this.showToast('Vui lòng chọn ít nhất 1 tài khoản để xóa', true);
            return;
        }
        if (!confirm(`CẢNH BÁO: Bạn chuẩn bị XÓA VĨNH VIỄN ${usernames.length} tài khoản. Bạn có chắc không?`)) return;
        this._executeBatchDelete(usernames);
    },

    async _executeBatchDelete(usernames) {
        this.showLoader(true);
        try {
            const res = await fetch(`/api/admin/users/delete_batch`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${this.state.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usernames: usernames })
            });

            if (res.ok) {
                const data = await res.json();
                this.showToast(data.message);
                this.loadAdminUsers();
            } else {
                this.showToast('Không thể xóa', true);
            }
        } catch (e) {
            this.showToast('Không thể kết nối đến server', true);
        } finally {
            this.showLoader(false);
        }
    },

    async loadAdminUserMedia(username) {
        document.getElementById('adminMediaUsername').textContent = username;
        this.showLoader(true);
        try {
            const res = await fetch(`/api/admin/users/${username}/media`, {
                headers: { 'Authorization': `Bearer ${this.state.token}` }
            });
            if (res.ok) {
                const mediaList = await res.json();
                const tbody = document.getElementById('adminMediaBody');
                tbody.innerHTML = '';
                if (mediaList.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Người dùng này chưa tải lên bài hát nào.</td></tr>';
                    return;
                }
                mediaList.forEach(m => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${m.MediaID}</td>
                        <td><a href="#watch/${m.MediaID}" target="_blank" style="color: var(--primary-color); text-decoration: none;">${m.Title}</a></td>
                        <td>${m.SourceType}</td>
                        <td>${m.ViewsCount}</td>
                        <td>👍 ${m.TotalLikes} / 👎 ${m.TotalDislikes}</td>
                        <td>
                            <button class="btn btn-secondary" style="color: #ef4444; border-color: #ef4444; padding: 0.2rem 0.5rem;" onclick="app.adminDeleteUserMedia(${m.MediaID}, '${username}')">Xóa Bài Hát</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            } else {
                this.showToast('Không thể tải danh sách', true);
                this.navigate('admin');
            }
        } catch (e) {
            console.error(e);
        } finally {
            this.showLoader(false);
        }
    },

    async adminDeleteUserMedia(mediaId, username) {
        if (!confirm('Bạn có chắc chắn muốn xóa bài hát này?')) return;
        this.showLoader(true);
        try {
            const res = await fetch(`/api/media/${mediaId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${this.state.token}` }
            });
            if (res.ok) {
                this.showToast('Đã xóa bài hát');
                this.loadAdminUserMedia(username); // Reload the list
            } else {
                const data = await res.json();
                this.showToast(data.detail || 'Không thể xóa', true);
            }
        } catch (e) {
            this.showToast('Lỗi kết nối', true);
        } finally {
            this.showLoader(false);
        }
    }
};

// Start app
app.init();
