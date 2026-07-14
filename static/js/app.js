// ============================================================
// SyncPlay — Full Client Application
// ============================================================

const i18n = {
    vi: {
        home: 'Trang chủ', login: 'Đăng nhập', logout: 'Đăng xuất', register: 'Đăng ký',
        upload: 'Tải lên', admin_panel: 'Admin', search_placeholder: 'Tìm kiếm',
        username: 'Tên đăng nhập', password: 'Mật khẩu', no_account: 'Chưa có tài khoản?',
        register_now: 'Đăng ký ngay', has_account: 'Đã có tài khoản?', login_now: 'Đăng nhập',
        add_new_video: 'Thêm Video Mới', upload_local_tab: 'Upload File (Local)',
        upload_link_tab: 'Chèn Link (YouTube/Spotify/SoundCloud)', upload_title: 'Tiêu đề',
        upload_author: 'Tên tác giả', upload_category: 'Thể loại nhạc (Chọn ít nhất 1)',
        choose_mp4: 'Chọn File MP4', source: 'Nguồn', url_path: 'Đường dẫn URL',
        subscribe: 'Đăng ký', delete_video: 'Xóa Video', edit_video: 'Chỉnh sửa Video',
        add_to_playlist: 'Thêm vào Playlist', comments: 'Bình luận',
        type_comment: 'Viết bình luận...', submit: 'Gửi',
        admin_settings: '<i class="ph ph-gear" style="margin-right: 8px;"></i> Admin Settings', max_total_accounts: 'Max Total Accounts',
        max_total_accounts_desc: 'Số lượng tài khoản tối đa được phép đăng ký.',
        max_uploads_per_user: 'Max Uploads Per User',
        max_uploads_per_user_desc: 'Số lượng video tối đa mỗi người dùng được tải lên.',
        save_settings: 'Lưu Cài Đặt', admin_manage_users: '<i class="ph ph-users" style="margin-right: 8px;"></i> Quản Lý Tài Khoản',
        admin_reload: 'Tải Lại', delete_selected: 'Xóa Đã Chọn',
        th_username: 'Username', th_password_hash: 'Mật khẩu (Hash)', th_uploads: 'Uploads',
        th_likes: 'Likes', th_dislikes: 'Dislikes', th_actions: 'Thao Tác',
        songs_of: 'Bài Hát của', go_back: 'Quay lại', th_title: 'Tiêu Đề', th_source: 'Nguồn',
        uploads: 'Bài hát', subscribers: 'Người theo dõi', uploaded_songs: 'Bài hát đã tải lên',
        my_playlists: 'Playlist của tôi', create_playlist: '+ Tạo Playlist',
        select_playlist: 'Chọn playlist:', cancel: 'Hủy', save_changes: 'Lưu thay đổi',
        play_all: '<i class="ph ph-play" style="margin-right: 4px;"></i> Phát tất cả', history: 'Lịch sử nghe', clear_history: 'Xóa lịch sử',
        recommended: 'Video đề xuất', liked_songs: 'Bài hát đã thích',
        disliked_songs: 'Bài hát không thích', playlists: 'Playlist',
        subscriptions: 'Kênh đã đăng ký', see_more: 'Xem thêm', delete: 'Xóa',
        watch_video: 'Xem Video', reset_password: 'Đặt lại MK',
        prompt_new_password: 'Nhập mật khẩu mới cho',
        all_categories: 'Tất cả', category_vpop: 'V-Pop', category_kpop: 'K-Pop',
        category_usuk: 'US-UK', category_rap: 'Rap/Hip-Hop', category_edm: 'EDM',
        category_lofi: 'Lofi', category_indie: 'Indie', category_instrumental: 'Nhạc cụ',
        category_remix: 'Remix', category_bolero: 'Bolero', category_podcast: 'Podcast',
        category_acoustic: 'Acoustic/Cover', category_other: 'Khác',
        sort_random: 'Ngẫu nhiên', sort_newest: 'Mới nhất', sort_most_viewed: 'Nhiều lượt xem nhất', sort_most_liked: 'Nhiều like',
        sort_author_asc: 'Tác giả (A-Z)', sort_author_desc: 'Tác giả (Z-A)',
        sort_title_asc: 'Tên bài hát (A-Z)', sort_title_desc: 'Tên bài hát (Z-A)',
        views: 'lượt xem', joined: 'Tham gia từ',
        total_views: 'Tổng Lượt Xem', total_likes: 'Tổng Lượt Thích', total_dislikes: 'Tổng Không Thích'
    },
    en: {
        home: 'Home', login: 'Login', logout: 'Logout', register: 'Register',
        upload: 'Upload', admin_panel: 'Admin', search_placeholder: 'Search',
        username: 'Username', password: 'Password', no_account: "Don't have an account?",
        register_now: 'Register now', has_account: 'Already have an account?', login_now: 'Login',
        add_new_video: 'Add New Video', upload_local_tab: 'Upload File (Local)',
        upload_link_tab: 'Insert Link (YouTube/Spotify/SoundCloud)', upload_title: 'Title',
        upload_author: 'Author name', upload_category: 'Music genre (Select at least 1)',
        choose_mp4: 'Choose MP4 File', source: 'Source', url_path: 'URL Path',
        subscribe: 'Subscribe', delete_video: 'Delete Video', edit_video: 'Edit Video',
        add_to_playlist: 'Add to Playlist', comments: 'Comments',
        type_comment: 'Write a comment...', submit: 'Submit',
        admin_settings: '<i class="ph ph-gear" style="margin-right: 8px;"></i> Admin Settings', max_total_accounts: 'Max Total Accounts',
        max_total_accounts_desc: 'Maximum number of accounts allowed to register.',
        max_uploads_per_user: 'Max Uploads Per User',
        max_uploads_per_user_desc: 'Maximum number of videos each user can upload.',
        save_settings: 'Save Settings', admin_manage_users: '<i class="ph ph-users" style="margin-right: 8px;"></i> Manage Users',
        admin_reload: 'Reload', delete_selected: 'Delete Selected',
        th_username: 'Username', th_password_hash: 'Password (Hash)', th_uploads: 'Uploads',
        th_likes: 'Likes', th_dislikes: 'Dislikes', th_actions: 'Actions',
        songs_of: 'Songs of', go_back: 'Go back', th_title: 'Title', th_source: 'Source',
        uploads: 'Songs', subscribers: 'Subscribers', uploaded_songs: 'Uploaded songs',
        my_playlists: 'My Playlists', create_playlist: '+ Create Playlist',
        select_playlist: 'Select playlist:', cancel: 'Cancel', save_changes: 'Save changes',
        play_all: '<i class="ph ph-play" style="margin-right: 4px;"></i> Play all', history: 'Listening history', clear_history: 'Clear history',
        recommended: 'Recommended', liked_songs: 'Liked songs',
        disliked_songs: 'Disliked songs', playlists: 'Playlists',
        subscriptions: 'Subscriptions', see_more: 'See more', delete: 'Delete',
        watch_video: 'Watch', reset_password: 'Reset PW',
        prompt_new_password: 'Enter new password for',
        all_categories: 'All', category_vpop: 'V-Pop', category_kpop: 'K-Pop',
        category_usuk: 'US-UK', category_rap: 'Rap/Hip-Hop', category_edm: 'EDM',
        category_lofi: 'Lofi', category_indie: 'Indie', category_instrumental: 'Instrumental',
        category_remix: 'Remix', category_bolero: 'Bolero', category_podcast: 'Podcast',
        category_acoustic: 'Acoustic/Cover', category_other: 'Other',
        sort_random: 'Random', sort_newest: 'Newest', sort_most_viewed: 'Most viewed', sort_most_liked: 'Most liked',
        sort_author_asc: 'Author (A-Z)', sort_author_desc: 'Author (Z-A)',
        sort_title_asc: 'Song name (A-Z)', sort_title_desc: 'Song name (Z-A)',
        views: 'views', joined: 'Joined',
        total_views: 'Total Views', total_likes: 'Total Likes', total_dislikes: 'Total Dislikes'
    }
};

function t(key) {
    const lang = localStorage.getItem('syncplay_lang') || 'vi';
    return (i18n[lang] && i18n[lang][key]) || key;
}

const originalFetch = window.fetch;
window.fetch = async function(...args) {
    const response = await originalFetch(...args);
    if (response.status === 401) {
        const url = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url ? args[0].url : '');
        if (url && !url.includes('/api/auth/login')) {
            if (typeof app !== 'undefined' && typeof app.logout === 'function') {
                app.showToast('Phiên đăng nhập hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.', true);
                app.logout();
            }
        }
    }
    return response;
};

const app = {
    state: {
        token: localStorage.getItem('syncplay_token'),
        username: localStorage.getItem('syncplay_username'),
        userId: localStorage.getItem('syncplay_userId'),
        isAdmin: localStorage.getItem('syncplay_isAdmin') === 'true',
        isLoginMode: true,
        currentUploadTab: 'LOCAL',
        currentMediaId: null,
        currentSearch: '',
        currentCategory: 'Tất cả',
        currentSort: 'random',
        currentProfileUsername: null,
        isSelectionMode: false,
        lang: localStorage.getItem('syncplay_lang') || 'vi',
        sidebarOpen: false,
        subsShowAll: false,
        playingPlaylistId: null,
        watchTimeInterval: null,
        watchTimeSeconds: 0,
        isViewCounted: false
    },

    init() {
        this.updateNav();
        this.applyLanguage();
        window.addEventListener('hashchange', () => this.handleRoute());
        // Close kebab menu on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.kebab-container') && !e.target.closest('#global-kebab-menu')) {
                const menu = document.getElementById('global-kebab-menu');
                if (menu) menu.remove();
            }
        });
        this.handleRoute();
        if (this.state.token) {
            this.loadSubscriptions();
        }
    },

    showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${isError ? 'error' : ''} show`;
        setTimeout(() => { toast.className = `toast ${isError ? 'error' : ''}`; }, 3000);
    },

    showLoader(show) {
        document.getElementById('globalLoader').className = show ? 'loader active' : 'loader';
    },

    navigate(view, param = null) {
        window.location.hash = param ? `${view}/${param}` : view;
    },

    goHome() {
        this.state.currentSearch = '';
        this.state.currentCategory = 'Tất cả';
        this.state.currentSort = 'random';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        const sortDropdown = document.getElementById('sortDropdown');
        if (sortDropdown) sortDropdown.value = 'random';
        document.querySelectorAll('.btn-category').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.trim() === 'Tất cả' || btn.textContent.trim() === 'All');
        });
        this.navigate('home');
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const parts = hash.split('/');
        const view = parts[0];
        const param = parts.slice(1).join('/');

        window.scrollTo(0, 0); // Reset scroll position when navigating
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));

        if (view !== 'watch') {
            const playerContainer = document.getElementById('playerContainer');
            if (playerContainer) playerContainer.innerHTML = '';
        }

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
            if (!this.state.isAdmin) { this.navigate('home'); }
            else { this.loadAdminSettings(); this.loadAdminUsers(); }
        } else if (view === 'admin-media' && param) {
            if (!this.state.isAdmin) { this.navigate('home'); }
            else { this.loadAdminUserMedia(param); }
        } else if (view === 'profile' && param) {
            this.loadProfile(param);
        } else if (view === 'playlists') {
            if (!this.state.token) { this.showToast('Vui lòng đăng nhập', true); this.navigate('auth'); }
            else { this.loadPlaylists(); }
        } else if (view === 'playlist-detail' && param) {
            this.loadPlaylistDetail(param);
        } else if (view === 'history') {
            if (!this.state.token) { this.showToast('Vui lòng đăng nhập', true); this.navigate('auth'); }
            else { this.loadHistory(); }
        }
    },

    
    renderSkeletonGrid(containerId, count = 8) {
        const grid = document.getElementById(containerId);
        if (!grid) return;
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
            <div class="media-card" style="border: none; pointer-events: none; background: transparent;">
                <div class="skeleton skeleton-thumbnail" style="border-radius: 12px;"></div>
                <div class="media-card-content" style="display:flex; gap:12px; margin-top:12px; padding:0;">
                    <div class="skeleton skeleton-avatar"></div>
                    <div style="flex:1;">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-meta"></div>
                        <div class="skeleton skeleton-meta-short"></div>
                    </div>
                </div>
            </div>`;
        }
        grid.innerHTML = html;
    },

    renderSkeletonWatch() {
        const playerContainer = document.getElementById('playerContainer');
        if (playerContainer) {
            playerContainer.innerHTML = '<div class="skeleton skeleton-player"></div>';
            playerContainer.className = 'player-wrapper';
        }
        document.getElementById('watchTitle').innerHTML = '<div class="skeleton skeleton-watch-title"></div>';
        document.getElementById('watchTags').innerHTML = '<div class="skeleton skeleton-watch-tags"></div>';
        document.getElementById('watchChannelName').innerHTML = '<div class="skeleton" style="width: 100px; height: 16px;"></div>';
        document.getElementById('watchAvatar').innerHTML = '';
        document.getElementById('watchDate').innerHTML = '<div class="skeleton" style="width: 80px; height: 12px; margin-top: 4px;"></div>';
        document.getElementById('watchLikes').textContent = '0';
        document.getElementById('watchDislikes').textContent = '0';
        const sidebar = document.getElementById('watchSidebarList');
        if (sidebar) {
            let html = '';
            for (let i = 0; i < 5; i++) {
                html += `
                <div style="display:flex;gap:12px;padding:8px;margin-bottom:12px;">
                    <div class="skeleton" style="width:168px;height:94px;border-radius:8px;flex-shrink:0;"></div>
                    <div style="flex:1;">
                        <div class="skeleton skeleton-title" style="width:90%;"></div>
                        <div class="skeleton skeleton-meta"></div>
                    </div>
                </div>`;
            }
            sidebar.innerHTML = html;
        }
    },

    renderSkeletonProfile() {
        document.getElementById('profileAvatar').innerHTML = '<div class="skeleton skeleton-profile-avatar"></div>';
        document.getElementById('profileUsername').innerHTML = '<div class="skeleton skeleton-profile-name"></div>';
        document.getElementById('profileJoined').innerHTML = '<div class="skeleton skeleton-profile-stats"></div>';
        document.getElementById('profileUploads').innerHTML = '<div class="skeleton" style="width:30px;height:24px;"></div>';
        document.getElementById('profileSubscribers').innerHTML = '<div class="skeleton" style="width:30px;height:24px;"></div>';
        this.renderSkeletonGrid('profileMediaGrid', 8);
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
            document.getElementById('navAvatar').textContent = this.state.username.charAt(0).toUpperCase();
            document.getElementById('navAdminBtn').style.display = this.state.isAdmin ? 'block' : 'none';
        } else {
            authItems.style.display = 'none';
            guestItems.style.display = 'block';
            document.getElementById('navAdminBtn').style.display = 'none';
        }
    },

    /* ================= LANGUAGE ================= */
    toggleLanguage() {
        this.state.lang = this.state.lang === 'vi' ? 'en' : 'vi';
        localStorage.setItem('syncplay_lang', this.state.lang);
        this.applyLanguage();
    },

    applyLanguage() {
        const btn = document.getElementById('langToggleBtn');
        if (btn) btn.textContent = this.state.lang === 'vi' ? 'VI' : 'EN';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t(key);
            } else {
                el.innerHTML = t(key);
            }
        });
    },

    /* ================= SIDEBAR ================= */
    toggleSidebar() {
        this.state.sidebarOpen = !this.state.sidebarOpen;
        document.getElementById('sidebar').classList.toggle('show', this.state.sidebarOpen);
        document.getElementById('sidebarOverlay').classList.toggle('show', this.state.sidebarOpen);
    },

    /* ================= AUTH ================= */
    toggleAuthMode() {
        this.state.isLoginMode = !this.state.isLoginMode;
        document.getElementById('authTitle').textContent = this.state.isLoginMode ? t('login') : t('register');
        document.getElementById('authSubmitBtn').textContent = this.state.isLoginMode ? t('login') : t('register');
        document.getElementById('authSwitchText').textContent = this.state.isLoginMode ? t('no_account') : t('has_account');
        document.getElementById('authSwitchLink').textContent = this.state.isLoginMode ? t('register_now') : t('login_now');
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
            const response = await fetch(url, { method: 'POST', body: formData });
            const data = await response.json();
            if (response.ok) {
                if (this.state.isLoginMode) {
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
                    this.loadSubscriptions();
                } else {
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
        this.renderSkeletonGrid('trendingGrid', 8);
        try {
            const queryParams = new URLSearchParams();
            if (this.state.currentSearch) queryParams.append('search', this.state.currentSearch);
            if (this.state.currentCategory && this.state.currentCategory !== 'Tất cả') queryParams.append('category', this.state.currentCategory);
            if (this.state.currentSort) queryParams.append('sort', this.state.currentSort);

            const response = await fetch(`/api/media/trending?${queryParams.toString()}`);
            if (response.ok) {
                const data = await response.json();
                this.renderMediaGrid(data);
            } else {
                const grid = document.getElementById('trendingGrid');
                if (grid) grid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1;">Không thể tải dữ liệu từ máy chủ. Vui lòng kiểm tra lại kết nối.</p>';
            }
        } catch(e) { 
            console.error(e); 
            const grid = document.getElementById('trendingGrid');
            if (grid) grid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1;">Lỗi kết nối. Không thể kết nối đến máy chủ backend.</p>';
        }
        finally { this.showLoader(false); }
    },

    handleSearch(event) {
        if (this.searchTimeout) clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.state.currentSearch = event.target.value;
            // Always redirect to home view to show search results if not already there
            const currentHash = window.location.hash;
            if (currentHash !== '' && currentHash !== '#' && currentHash !== '#home') {
                this.navigate('home');
            } else {
                this.loadTrending();
            }
        }, 500);
    },

    setCategory(category) {
        this.state.currentCategory = category;
        document.querySelectorAll('.btn-category').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.trim() === category);
        });
        this.loadTrending();
    },

    setSort(value) {
        this.state.currentSort = value;
        this.loadTrending();
    },

    scrollCategory(direction) {
        const container = document.getElementById('categoryFilters');
        if (!container) return;
        const scrollAmount = 200;
        container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        setTimeout(() => this.updateCategoryScrollButtons(), 300);
    },

    updateCategoryScrollButtons() {
        const container = document.getElementById('categoryFilters');
        if (!container) return;
        const leftBtn = container.parentElement.querySelector('.category-scroll-btn.left');
        const rightBtn = container.parentElement.querySelector('.category-scroll-btn.right');
        if (leftBtn) leftBtn.classList.toggle('hide-btn', container.scrollLeft <= 0);
        if (rightBtn) rightBtn.classList.toggle('hide-btn', container.scrollLeft + container.clientWidth >= container.scrollWidth - 5);
    },

    renderMediaGrid(mediaList) {
        const grid = document.getElementById('trendingGrid');
        grid.innerHTML = '';

        if (mediaList.length === 0) {
            grid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1;">Chưa có video nào. Hãy là người đầu tiên tải lên!</p>';
            return;
        }

        // SVG icons cho Source Tags (platform recognition)
        const badgeIcons = {
            LOCAL: `<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
            YOUTUBE: `<svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
            SPOTIFY: `<svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
            SOUNDCLOUD: `<svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M11.17 12.18v9.82H2c-1.1 0-2-.9-2-2v-4.44c0-2.02 1.35-3.8 3.26-4.27.47-1.89 2.18-3.3 4.22-3.3 1.25 0 2.39.53 3.2 1.38.16.17.31.35.49.81zm10.83-1.34c0-.85-.68-1.54-1.54-1.54-.34 0-.66.11-.93.31l-7.07 5.14v7.25h9.54v-11.16z"/></svg>`
        };

        mediaList.forEach(m => {
            const card = document.createElement('div');
            card.className = 'media-card';
            // data-source cho CSS Cinematic Glow theo platform
            card.setAttribute('data-source', m.sourceType);
            card.onclick = (e) => {
                if (this.state.isSelectionMode) {
                    this.toggleCardSelection(card, e);
                } else {
                    this.navigate('watch', m.id);
                }
            };

            let badgeClass = m.sourceType === 'LOCAL' ? 'badge-local' : (m.sourceType === 'YOUTUBE' ? 'badge-youtube' : (m.sourceType === 'SOUNDCLOUD' ? 'badge-soundcloud' : 'badge-spotify'));
            let badgeIcon = badgeIcons[m.sourceType] || badgeIcons.LOCAL;

            // Thumbnail với zoom structure + cinematic fallback
            let thumbnailContent = '';
            if (m.sourceType === 'YOUTUBE') {
                const ytId = m.resource.includes('v=') ? m.resource.split('v=')[1].split('&')[0] : m.resource.split('/').pop();
                thumbnailContent = `<img src="https://img.youtube.com/vi/${ytId}/maxresdefault.jpg" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`;
            } else {
                // Cinematic fallback: gradient + icon Play chìm (opacity 20%)
                thumbnailContent = `<div class="thumb-fallback thumb-zoom-target">
                    <svg class="fallback-play-icon" width="48" height="48" viewBox="0 0 24 24" fill="rgba(240,140,90,0.9)" style="filter: drop-shadow(0 2px 8px rgba(224,90,58,0.3));"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>`;
            }

            let tagsHtml = '';
            if (m.category && m.category !== 'Khác' && m.category !== '') {
                tagsHtml = `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;">${m.category.split(',').map(c => `<span style="font-size:0.7rem;color:var(--accent-secondary);opacity:0.8;">#${c.trim()}</span>`).join('')}</div>`;
            }

            let uploaderHtml = '';
            if (m.channelName) {
                uploaderHtml = `<div style="font-size: 0.75rem; color: var(--text-muted); opacity: 0.8; margin-top: 4px; display: flex; align-items: center; gap: 4px;" title="Người đăng">
                    <i class="ph ph-user" style="font-size: 12px;"></i>
                    ${m.channelName} &bull; ${m.views !== undefined ? m.views : 0} <span data-i18n="views">lượt xem</span>
                </div>`;
            }

            let controlsContent = '';
            if (m.channelName === this.state.username || this.state.isAdmin) {
    controlsContent = `
        <div class="kebab-container" style="position:absolute;top:-4px;right:-8px;z-index:10;" onclick="event.stopPropagation()">
            <button class="btn-kebab" onclick="app.openKebabMenu(event, '${m.id}', '${m.channelName}')" style="background:transparent; border:none; color:var(--text-color); cursor:pointer; padding:4px; opacity:0.7; transition:opacity 0.2s;" onmouseenter="this.style.opacity=1" onmouseleave="this.style.opacity=0.7">
                <i class="ph ph-dots-three-vertical" style="font-size: 20px;"></i>
            </button>
        </div>`;
}

            card.innerHTML = `
    <input type="checkbox" class="batch-delete-cb" value="${m.id}" onchange="app.updateBatchDeleteBtn()">
            <div class="media-card-thumbnail" style="position:relative; border-radius:12px; overflow:hidden;">
        ${thumbnailContent}
        <span class="media-source-badge ${badgeClass}">${badgeIcon}${m.sourceType}</span>
    </div>
    <div class="media-card-content" style="display:flex; gap:12px; margin-top:12px; padding:0;">
        <div class="channel-avatar" style="width:36px;height:36px;font-size:0.95rem;flex-shrink:0;">${m.channelName.charAt(0).toUpperCase()}</div>
        <div class="media-card-info" style="flex:1; min-width:0; position:relative; padding-right: 24px;">
            <div class="media-card-title" title="${m.title}${m.author || m.Author ? ' - ' + (m.author || m.Author) : ''}" style="font-size:1rem; font-weight:700; line-height:1.4; color:#f8f8f2; display: flex; align-items: baseline; margin-top: 4px;">
                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-shrink: 1;">${m.title}</span>
                ${m.author || m.Author ? `<span style=\"white-space: nowrap; flex-shrink: 0; color: #9ca3af; font-weight: 400; font-size: 0.85em;\">&nbsp;- ${m.author || m.Author}</span>` : ''}
            </div>
            ${tagsHtml}
              ${uploaderHtml}
            ${controlsContent}
        </div>
    </div>`;
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
        document.getElementById('uploadFile').required = tab === 'LOCAL';
        document.getElementById('uploadUrl').required = tab === 'LINK';
    },

    async handleUpload(event) {
        event.preventDefault();
        const title = document.getElementById('uploadTitle').value;
        const authorInput = document.getElementById('uploadAuthor');
        const author = authorInput ? authorInput.value : '';
        const checkboxes = document.querySelectorAll('#uploadCategory input[name="category"]:checked');
        const category = Array.from(checkboxes).map(cb => cb.value).join(',');
        if (!category) { this.showToast('Vui lòng chọn ít nhất 1 thể loại', true); return; }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('author', author);

        let url = '';
        if (this.state.currentUploadTab === 'LOCAL') {
            const file = document.getElementById('uploadFile').files[0];
            if (!file) return this.showToast('Vui lòng chọn file', true);
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
        const btn = document.getElementById('btnSubmitUpload');
        btn.disabled = true; btn.textContent = 'Đang tải lên...';
        try {
            const response = await fetch(url, { method: 'POST', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: formData });
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
            btn.disabled = false; btn.textContent = t('upload');
        }
    },

    /* ================= WATCH & INTERACT ================= */
    async loadWatchData(param) {
        let mediaId = param;
        let playlistId = null;
        if (typeof param === 'string' && param.includes('?playlist=')) {
            const parts = param.split('?playlist=');
            mediaId = parts[0];
            playlistId = parts[1];
        }
        this.state.currentMediaId = mediaId;
        this.state.playingPlaylistId = playlistId;
        
        // Reset watch tracking
        this.stopWatchTimeTracking();
        this.state.watchTimeSeconds = 0;
        this.state.isViewCounted = false;
        
        this.renderSkeletonWatch();
        try {
            const res = await fetch(`/api/media/details/${mediaId}`);
            if (!res.ok) { this.navigate('home'); return this.showToast('Video không tồn tại', true); }
            const media = await res.json();

            document.getElementById('watchTitle').textContent = media.Title;
            document.getElementById('watchChannelName').textContent = media.ChannelName;
            document.getElementById('watchAvatar').textContent = media.ChannelName.charAt(0).toUpperCase();
            
            const watchViewsEl = document.getElementById('watchViews');
            if (watchViewsEl) watchViewsEl.textContent = media.ViewsCount || 0;

            const watchTags = document.getElementById('watchTags');
            if (media.Category && media.Category !== 'Khác' && media.Category !== '') {
                watchTags.innerHTML = media.Category.split(',').map(c => `<span style="font-size:0.8rem;color:var(--accent-secondary);margin-right:8px;">#${c.trim()}</span>`).join('');
            } else {
                watchTags.innerHTML = '';
            }

            document.getElementById('watchLikes').textContent = media.TotalLikes || 0;
            document.getElementById('watchDislikes').textContent = media.TotalDislikes || 0;
            document.getElementById('commentCount').textContent = media.TotalComments || 0;

            // Record history
            if (this.state.token) {
                const fd = new FormData(); fd.append('media_id', mediaId);
                fetch('/api/history', { method: 'POST', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: fd }).catch(() => {});
            }

            // Show Delete and Edit buttons if owner or admin
            const btnDelete = document.getElementById('btnDeleteMedia');
            const btnEdit = document.getElementById('btnEditMedia');
            if (this.state.username === media.ChannelName || this.state.isAdmin) {
                btnDelete.style.display = 'inline-block';
                btnEdit.style.display = 'inline-block';
            } else {
                btnDelete.style.display = 'none';
                btnEdit.style.display = 'none';
            }

            const date = new Date(media.UploadDate);
            document.getElementById('watchDate').textContent = date.toLocaleDateString('vi-VN');

            // Render Player
            const playerContainer = document.getElementById('playerContainer');
            playerContainer.className = 'player-wrapper';
            let playerHTML = '';

            if (media.SourceType === 'LOCAL') {
                playerHTML = `<video id="localVideoPlayer" controls autoplay><source src="/api/media/stream/${media.MediaID}" type="video/mp4"></video>`;
            } else if (media.SourceType === 'YOUTUBE') {
                let ytId = '';
                try {
                    if (media.MediaResource.includes('v=')) {
                        ytId = media.MediaResource.split('v=')[1].split('&')[0];
                    } else {
                        ytId = media.MediaResource.split('/').pop();
                    }
                } catch(e) {}
                playerHTML = `<div id="youtubePlayer"></div>`;
                setTimeout(() => app.initYouTubePlayer(ytId), 100);
            } else if (media.SourceType === 'SPOTIFY') {
                let embedUrl = media.MediaResource;
                if (embedUrl.includes('open.spotify.com/track/')) {
                    embedUrl = embedUrl.replace('open.spotify.com/track/', 'open.spotify.com/embed/track/');
                }
                playerContainer.className += ' spotify-player';
                playerHTML = `<iframe src="${embedUrl}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
                app.startWatchTimeTracking();
            } else if (media.SourceType === 'SOUNDCLOUD') {
                playerContainer.className += ' soundcloud-player';
                playerHTML = `<iframe src="${media.MediaResource}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
                app.startWatchTimeTracking();
            }

            // Append autoplay overlay
            playerHTML += `
                <div id="autoplayOverlay" class="autoplay-overlay" style="display:none;">
                    <div class="autoplay-card">
                        <div class="autoplay-next-label" data-i18n="up_next">Sắp phát tiếp theo</div>
                        <div class="autoplay-thumbnail" style="cursor:pointer; position: relative; display: flex; align-items: center; justify-content: center;" onclick="app.playNext()">
                            <div id="autoplayNextImg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"></div>
                            <div style="position: absolute; z-index: 2; background: rgba(0,0,0,0.6); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); transition: background 0.2s, transform 0.2s;" onmouseenter="this.style.background='var(--accent-primary)'; this.style.transform='scale(1.1)';" onmouseleave="this.style.background='rgba(0,0,0,0.6)'; this.style.transform='scale(1)';">
                                <i class="ph ph-play-circle" style="font-size: 24px; color: white;"></i>
                            </div>
                        </div>
                        <div class="autoplay-title" id="autoplayNextTitle"></div>
                        <div class="autoplay-actions">
                            <button class="btn btn-secondary" onclick="app.cancelAutoplay()" data-i18n="cancel">Hủy</button>
                            <button class="autoplay-circle-btn" onclick="app.playNext()">
                                <svg class="autoplay-circle-svg" viewBox="0 0 72 72">
                                    <circle class="autoplay-circle-path" id="autoplayCirclePath" cx="36" cy="36" r="32"></circle>
                                </svg>
                                <span id="autoplayCountText" style="font-size: 1.2rem; font-weight: bold;">5</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            playerContainer.innerHTML = playerHTML;

            if (media.SourceType === 'LOCAL') {
                setTimeout(() => {
                    const vid = document.getElementById('localVideoPlayer');
                    if (vid) {
                        vid.onended = () => { app.stopWatchTimeTracking(); app.startAutoplay(); };
                        vid.onplay = () => app.startWatchTimeTracking();
                        vid.onpause = () => app.stopWatchTimeTracking();
                        vid.onwaiting = () => app.stopWatchTimeTracking();
                        vid.onplaying = () => app.startWatchTimeTracking();
                    }
                }, 100);
            }

            this.loadComments(mediaId);
            this.loadWatchSidebar(mediaId);
            this.updateSubscribeButton();
        } catch (e) { console.error(e); }
        finally { this.showLoader(false); }
    },

    async loadWatchSidebar(currentMediaId) {
        try {
            if (this.state.playingPlaylistId && this.state.token) {
                const res = await fetch(`/api/playlists/${this.state.playingPlaylistId}`, { headers: { 'Authorization': `Bearer ${this.state.token}` } });
                if (res.ok) {
                    const data = await res.json();
                    const allMedia = data.items;
                    const sidebar = document.getElementById('watchSidebarList');
                    sidebar.innerHTML = `<div style="padding: 12px; margin-bottom: 12px; background: var(--bg-surface); border-radius: 8px;">
                        <h3 style="margin: 0 0 4px 0; font-size: 1rem;">${data.name}</h3>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${data.items.length} bài hát</div>
                    </div>`;
                    
                    if (allMedia.length > 0) {
                        allMedia.forEach((m, index) => {
                            let thumb = '';
                            if (m.sourceType === 'YOUTUBE') {
                                const ytId = m.resource.includes('v=') ? m.resource.split('v=')[1].split('&')[0] : m.resource.split('/').pop();
                                thumb = `<img class="sidebar-thumb-el" src="https://img.youtube.com/vi/${ytId}/mqdefault.jpg" style="width:168px;height:94px;object-fit:cover;border-radius:8px;flex-shrink:0;">`;
                            } else {
                                thumb = `<div class="sidebar-thumb-el" style="width:168px;height:94px;background:linear-gradient(135deg,#1c1210,#3d2218);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="ph ph-music-note" style="font-size: 28px; color: rgba(240,140,90,0.6);"></i></div>`;
                            }
                            const isActive = String(m.id) === String(currentMediaId);
                            const item = document.createElement('div');
                            item.className = 'sidebar-video-item media-card' + (isActive ? ' active-playlist-item' : '');
                            item.setAttribute('data-id', m.id);
                            item.style.cssText = `display:flex;gap:12px;padding:8px;cursor:pointer;margin-bottom:12px;transition:transform 0.2s, background 0.2s; ${isActive ? 'background: var(--bg-surface-hover); border-left: 4px solid var(--accent-primary);' : ''}`;
                            item.onmouseenter = () => { if (!isActive) { item.style.transform = 'scale(1.02)'; item.style.background = 'var(--bg-surface-hover)'; } };
                            item.onmouseleave = () => { if (!isActive) { item.style.transform = 'scale(1)'; item.style.background = ''; } };
                            item.onclick = () => this.navigate('watch', `${m.id}?playlist=${this.state.playingPlaylistId}`);
                            item.innerHTML = `${thumb}<div style="min-width:0;display:flex;flex-direction:column;justify-content:center;"><div class="sidebar-video-title" style="font-size:0.95rem;font-weight:600;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin-bottom:4px;line-height:1.4;">${m.title}</div><div style="font-size:0.8rem;color:var(--text-muted);">${m.channelName} &bull; ${m.views !== undefined ? m.views : 0} <span data-i18n="views">lượt xem</span></div></div>`;
                            sidebar.appendChild(item);
                        });
                        
                        setTimeout(() => {
                            const activeEl = sidebar.querySelector('.active-playlist-item');
                            if (activeEl) activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 500);
                    }
                    return;
                }
            }

            const res = await fetch('/api/media/trending?sort=random');
            if (res.ok) {
                const allMedia = await res.json();
                const sidebar = document.getElementById('watchSidebarList');
                sidebar.innerHTML = '';
                const filtered = allMedia.filter(m => String(m.id) !== String(currentMediaId)).slice(0, 15);
                if (filtered.length === 0) {
                    sidebar.innerHTML = '<p style="color:var(--text-muted);padding:1rem;">Không có video đề xuất</p>';
                    return;
                }
                filtered.forEach(m => {
                    let thumb = '';
                    if (m.sourceType === 'YOUTUBE') {
                        const ytId = m.resource.includes('v=') ? m.resource.split('v=')[1].split('&')[0] : m.resource.split('/').pop();
                        thumb = `<img class="sidebar-thumb-el" src="https://img.youtube.com/vi/${ytId}/mqdefault.jpg" style="width:168px;height:94px;object-fit:cover;border-radius:8px;flex-shrink:0;">`;
                    } else {
                        thumb = `<div class="sidebar-thumb-el" style="width:168px;height:94px;background:linear-gradient(135deg,#1c1210,#3d2218);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="ph ph-music-note" style="font-size: 28px; color: rgba(240,140,90,0.6);"></i></div>`;
                    }
                    const item = document.createElement('div');
                    item.className = 'sidebar-video-item media-card';
                    item.setAttribute('data-id', m.id);
                    item.style.cssText = 'display:flex;gap:12px;padding:8px;cursor:pointer;margin-bottom:12px;transition:transform 0.2s, background 0.2s;';
                    item.onmouseenter = () => { item.style.transform = 'scale(1.02)'; item.style.background = 'var(--bg-surface-hover)'; };
                    item.onmouseleave = () => { item.style.transform = 'scale(1)'; item.style.background = ''; };
                    item.onclick = () => this.navigate('watch', m.id);
                    item.innerHTML = `${thumb}<div style="min-width:0;display:flex;flex-direction:column;justify-content:center;"><div class="sidebar-video-title" style="font-size:0.95rem;font-weight:600;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin-bottom:4px;line-height:1.4;">${m.title}</div><div style="font-size:0.8rem;color:var(--text-muted);">${m.channelName} &bull; ${m.views !== undefined ? m.views : 0} <span data-i18n="views">lượt xem</span></div></div>`;
                    sidebar.appendChild(item);
                });
            }
        } catch (e) { console.error(e); }
    },

    initYouTubePlayer(ytId) {
        if (!window.YT || !window.YT.Player) {
            setTimeout(() => this.initYouTubePlayer(ytId), 500);
            return;
        }
        this.ytPlayer = new YT.Player('youtubePlayer', {
            videoId: ytId,
            playerVars: { 'autoplay': 1, 'playsinline': 1 },
            events: {
                'onStateChange': (event) => {
                    if (event.data === YT.PlayerState.PLAYING) {
                        this.startWatchTimeTracking();
                    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.BUFFERING) {
                        this.stopWatchTimeTracking();
                    } else if (event.data === YT.PlayerState.ENDED) {
                        this.stopWatchTimeTracking();
                        this.startAutoplay();
                    }
                }
            }
        });
    },

    startWatchTimeTracking() {
        if (this.state.isViewCounted) return;
        if (this.state.watchTimeInterval) return;
        
        this.state.watchTimeInterval = setInterval(() => {
            this.state.watchTimeSeconds += 1;
            if (this.state.watchTimeSeconds >= 15 && !this.state.isViewCounted) {
                this.incrementViewCount();
            }
        }, 1000);
    },

    stopWatchTimeTracking() {
        if (this.state.watchTimeInterval) {
            clearInterval(this.state.watchTimeInterval);
            this.state.watchTimeInterval = null;
        }
    },

    async incrementViewCount() {
        if (this.state.isViewCounted || !this.state.currentMediaId) return;
        this.state.isViewCounted = true;
        this.stopWatchTimeTracking();
        try {
            const res = await fetch(`/api/media/${this.state.currentMediaId}/view`, { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                const watchViewsEl = document.getElementById('watchViews');
                if (watchViewsEl) {
                    watchViewsEl.textContent = data.views;
                }
            }
        } catch (e) { console.error("Error incrementing view count", e); }
    },

    startAutoplay() {
        this.cancelAutoplay();
        const nextItems = document.querySelectorAll('.sidebar-video-item');
        if (nextItems.length === 0) return;
        
        let nextItem = null;
        if (this.state.playingPlaylistId) {
            for (let i = 0; i < nextItems.length; i++) {
                if (nextItems[i].classList.contains('active-playlist-item')) {
                    if (i + 1 < nextItems.length) nextItem = nextItems[i + 1];
                    break;
                }
            }
        } else {
            nextItem = nextItems[0];
        }
        
        if (!nextItem) return;
        
        const nextId = nextItem.getAttribute('data-id');
        const targetUrl = this.state.playingPlaylistId ? `${nextId}?playlist=${this.state.playingPlaylistId}` : nextId;
        const thumbEl = nextItem.querySelector('.sidebar-thumb-el');
        let clonedThumb = thumbEl.cloneNode(true);
        clonedThumb.style.width = '100%';
        clonedThumb.style.height = '100%';
        clonedThumb.style.borderRadius = '0';
        const title = nextItem.querySelector('.sidebar-video-title').textContent;
        
        document.getElementById('autoplayOverlay').style.display = 'flex';
        const imgContainer = document.getElementById('autoplayNextImg');
        imgContainer.style.width = '100%';
        imgContainer.style.height = '100%';
        imgContainer.innerHTML = '';
        imgContainer.appendChild(clonedThumb);
        document.getElementById('autoplayNextTitle').textContent = title;
        
        this.autoplayCountdown = 5;
        document.getElementById('autoplayCountText').textContent = this.autoplayCountdown;
        
        const path = document.getElementById('autoplayCirclePath');
        if (path) {
            path.style.transition = 'none';
            path.style.strokeDashoffset = '0';
            setTimeout(() => {
                path.style.transition = 'stroke-dashoffset 5s linear';
                path.style.strokeDashoffset = '201';
            }, 50);
        }

        this.autoplayInterval = setInterval(() => {
            this.autoplayCountdown--;
            const countText = document.getElementById('autoplayCountText');
            if (countText) countText.textContent = this.autoplayCountdown;
            
            if (this.autoplayCountdown <= 0) {
                this.cancelAutoplay();
                this.navigate('watch', targetUrl);
            }
        }, 1000);
    },

    cancelAutoplay() {
        if (this.autoplayInterval) clearInterval(this.autoplayInterval);
        const overlay = document.getElementById('autoplayOverlay');
        if (overlay) overlay.style.display = 'none';
        const path = document.getElementById('autoplayCirclePath');
        if (path) {
            path.style.transition = 'none';
            path.style.strokeDashoffset = '0';
        }
    },

    playNext() {
        this.cancelAutoplay();
        const nextItems = document.querySelectorAll('.sidebar-video-item');
        
        let nextItem = null;
        if (this.state.playingPlaylistId) {
            for (let i = 0; i < nextItems.length; i++) {
                if (nextItems[i].classList.contains('active-playlist-item')) {
                    if (i + 1 < nextItems.length) nextItem = nextItems[i + 1];
                    break;
                }
            }
        } else if (nextItems.length > 0) {
            nextItem = nextItems[0];
        }

        if (nextItem) {
            const nextId = nextItem.getAttribute('data-id');
            const targetUrl = this.state.playingPlaylistId ? `${nextId}?playlist=${this.state.playingPlaylistId}` : nextId;
            this.navigate('watch', targetUrl);
        }
    },

    async deleteMedia() {
        if (!confirm('Bạn có chắc chắn muốn xóa video này?')) return;
        this.showLoader(true);
        try {
            const res = await fetch(`/api/media/${this.state.currentMediaId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) { this.showToast('Đã xóa video'); this.navigate('home'); }
            else { const data = await res.json(); this.showToast(data.detail || 'Không thể xóa video', true); }
        } catch(e) { this.showToast('Có lỗi xảy ra', true); }
        finally { this.showLoader(false); }
    },

    async toggleLike(isLike) {
        if (!this.state.token) return this.showToast('Vui lòng đăng nhập để tương tác', true);
        const formData = new FormData();
        formData.append('media_id', this.state.currentMediaId);
        formData.append('is_like', isLike);
        try {
            const res = await fetch('/api/interact/like', { method: 'POST', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: formData });
            if (res.ok) {
                const detailsRes = await fetch(`/api/media/details/${this.state.currentMediaId}`);
                if (detailsRes.ok) {
                    const media = await detailsRes.json();
                    document.getElementById('watchLikes').textContent = media.TotalLikes || 0;
                    document.getElementById('watchDislikes').textContent = media.TotalDislikes || 0;
                }
            }
        } catch(e) {}
    },

    async toggleSubscribe() {
        if (!this.state.token) return this.showToast('Vui lòng đăng nhập', true);
        const channelName = document.getElementById('watchChannelName').textContent;
        if (!channelName || channelName === '...') return;
        
        const formData = new FormData();
        formData.append('channel_username', channelName);
        try {
            const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: formData });
            if (res.ok) {
                const data = await res.json();
                this.showToast(data.message === 'Subscribed' ? 'Đã đăng ký kênh' : 'Đã hủy đăng ký');
                this.loadSubscriptions();
            } else {
                const data = await res.json();
                this.showToast(data.detail || 'Lỗi', true);
            }
        } catch(e) {
            this.showToast('Lỗi mạng', true);
        }
    },

    updateSubscribeButton() {
        const btnSub = document.getElementById('btnSubscribe');
        if (!btnSub) return;
        const channelName = document.getElementById('watchChannelName').textContent;
        if (!this.state.token || channelName === this.state.username) {
            btnSub.style.display = 'none';
        } else if (channelName && channelName !== '...') {
            btnSub.style.display = 'inline-block';
            const isSubbed = this.state.subscriptions && this.state.subscriptions.some(s => s.username === channelName);
            if (isSubbed) {
                btnSub.textContent = 'Đã đăng ký';
                btnSub.style.background = 'var(--bg-surface)';
                btnSub.style.color = 'var(--text-secondary)';
                btnSub.style.borderColor = 'transparent';
            } else {
                btnSub.textContent = t('subscribe');
                btnSub.style.background = '';
                btnSub.style.color = '';
                btnSub.style.borderColor = '';
            }
        }
    },

    /* ================= COMMENTS ================= */
    async loadComments(mediaId) {
        const res = await fetch(`/api/comments/${mediaId}`);
        if (res.ok) {
            const comments = await res.json();
            const list = document.getElementById('commentList');
            list.innerHTML = '';
            comments.forEach(c => {
                const isOwner = c.username === this.state.username;
                const isAdmin = this.state.isAdmin;
                let actionsHtml = '';
                if (isOwner) {
                    actionsHtml = `<div style="display:flex;gap:8px;margin-top:6px;">
                        <button class="btn btn-secondary" style="padding:2px 8px;font-size:0.75rem;" onclick="app.editComment(${c.comment_id}, '${c.content.replace(/'/g, "\\'")}')">Sửa</button>
                        <button class="btn btn-secondary" style="padding:2px 8px;font-size:0.75rem;color:#ef4444;border-color:#ef4444;" onclick="app.deleteComment(${c.comment_id})">Xóa</button>
                    </div>`;
                } else if (isAdmin) {
                    actionsHtml = `<div style="display:flex;gap:8px;margin-top:6px;">
                        <button class="btn btn-secondary" style="padding:2px 8px;font-size:0.75rem;color:#ef4444;border-color:#ef4444;" onclick="app.deleteComment(${c.comment_id})">Xóa</button>
                    </div>`;
                }
                list.innerHTML += `
                    <div class="comment-item">
                        <div class="comment-avatar">${c.username.charAt(0).toUpperCase()}</div>
                        <div class="comment-content">
                            <h4>${c.username}</h4>
                            <p>${c.content}</p>
                            ${actionsHtml}
                        </div>
                    </div>`;
            });
        }
    },

    async postComment(event) {
        event.preventDefault();
        if (!this.state.token) { this.showToast('Vui lòng đăng nhập để bình luận', true); return; }
        const input = document.getElementById('commentInput');
        const content = input.value;
        const formData = new FormData();
        formData.append('media_id', this.state.currentMediaId);
        formData.append('content', content);
        try {
            const res = await fetch('/api/comments', { method: 'POST', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: formData });
            if (res.ok) { input.value = ''; this.loadComments(this.state.currentMediaId); const countEl = document.getElementById('commentCount'); countEl.textContent = parseInt(countEl.textContent) + 1; }
        } catch(e) {}
    },

    async editComment(commentId, oldContent) {
        const newContent = prompt('Sửa bình luận:', oldContent);
        if (!newContent || newContent.trim() === '') return;
        const formData = new FormData();
        formData.append('content', newContent);
        try {
            const res = await fetch(`/api/comments/${commentId}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: formData });
            if (res.ok) { this.showToast('Đã sửa bình luận'); this.loadComments(this.state.currentMediaId); }
            else { const data = await res.json(); this.showToast(data.detail || 'Lỗi', true); }
        } catch(e) { this.showToast('Lỗi mạng', true); }
    },

    async deleteComment(commentId) {
        if (!confirm('Xóa bình luận này?')) return;
        try {
            const res = await fetch(`/api/comments/${commentId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) { this.showToast('Đã xóa bình luận'); this.loadComments(this.state.currentMediaId); const countEl = document.getElementById('commentCount'); countEl.textContent = Math.max(0, parseInt(countEl.textContent) - 1); }
            else { const data = await res.json(); this.showToast(data.detail || 'Lỗi', true); }
        } catch(e) { this.showToast('Lỗi mạng', true); }
    },

    /* ================= EDIT MEDIA MODAL ================= */
    async openEditMediaModal() {
        const res = await fetch(`/api/media/details/${this.state.currentMediaId}`);
        if (!res.ok) return;
        const media = await res.json();
        document.getElementById('editMediaTitle').value = media.Title;
        document.getElementById('editMediaAuthor').value = media.Author || '';
        // Reset and check category checkboxes
        document.querySelectorAll('#editCategory input[name="edit_category"]').forEach(cb => {
            cb.checked = media.Category && media.Category.split(',').map(c => c.trim()).includes(cb.value);
        });
        this.state.editingMediaId = this.state.currentMediaId;
        const modal = document.getElementById('editMediaModal');
        modal.style.display = 'flex';
    },

    async openEditMediaModalFromProfile(mediaId) {
        const res = await fetch(`/api/media/details/${mediaId}`);
        if (!res.ok) return;
        const media = await res.json();
        document.getElementById('editMediaTitle').value = media.Title;
        document.getElementById('editMediaAuthor').value = media.Author || '';
        document.querySelectorAll('#editCategory input[name="edit_category"]').forEach(cb => {
            cb.checked = media.Category && media.Category.split(',').map(c => c.trim()).includes(cb.value);
        });
        this.state.editingMediaId = mediaId;
        document.getElementById('editMediaModal').style.display = 'flex';
    },

    closeEditMediaModal() {
        document.getElementById('editMediaModal').style.display = 'none';
    },

    async saveMediaChanges(event) {
        event.preventDefault();
        const title = document.getElementById('editMediaTitle').value;
        const author = document.getElementById('editMediaAuthor').value;
        const checkboxes = document.querySelectorAll('#editCategory input[name="edit_category"]:checked');
        const category = Array.from(checkboxes).map(cb => cb.value).join(',');
        if (!category) { this.showToast('Vui lòng chọn ít nhất 1 thể loại', true); return; }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('category', category);

        try {
            const res = await fetch(`/api/media/${this.state.editingMediaId}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: formData });
            if (res.ok) {
                this.showToast('Đã cập nhật!');
                this.closeEditMediaModal();
                // Reload current view
                if (this.state.currentProfileUsername) { this.loadProfile(this.state.currentProfileUsername); } else { this.loadMedia(true); }
                if (this.state.currentMediaId == this.state.editingMediaId) this.loadWatchData(this.state.currentMediaId);
                this.loadTrending();
            } else {
                const data = await res.json();
                this.showToast(data.detail || 'Lỗi', true);
            }
        } catch(e) { this.showToast('Lỗi mạng', true); }
    },

    /* ================= PROFILE ================= */
    async loadProfile(username) {
        this.renderSkeletonProfile();
        
        const pAvatar = document.getElementById('profileAvatar');
        if (pAvatar) pAvatar.style.display = 'flex';
        const pStats = document.querySelector('.profile-stats');
        if (pStats) pStats.style.display = 'flex';
        const pJoined = document.getElementById('profileJoined');
        if (pJoined) pJoined.style.display = 'block';

        try {
            // Load profile info
            const profileRes = await fetch(`/api/profile/${username}`);
            if (!profileRes.ok) { this.showToast('Không tìm thấy người dùng', true); return; }
            const profile = await profileRes.json();
            document.getElementById('profileAvatar').textContent = username.charAt(0).toUpperCase();
            document.getElementById('profileUsername').textContent = username;
            document.getElementById('profileUploads').textContent = profile.upload_count;
            document.getElementById('profileSubscribers').textContent = profile.subscriber_count;
            document.getElementById('profileTotalViews').textContent = profile.total_views || 0;
            document.getElementById('profileTotalLikes').textContent = profile.total_likes || 0;
            document.getElementById('profileTotalDislikes').textContent = profile.total_dislikes || 0;
            const joinDate = profile.created_at ? new Date(profile.created_at).toLocaleDateString('vi-VN') : '';
            document.getElementById('profileJoined').innerHTML = joinDate ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/></svg> Tham gia từ ${joinDate}` : '';

            // Show action buttons if it's the user's own profile or admin
            const actionBtns = document.getElementById('profileActionBtns');
            if (username === this.state.username || this.state.isAdmin) {
                actionBtns.style.display = 'flex';
            } else {
                actionBtns.style.display = 'none';
            }

            // Reset selection state
            const btnToggle = document.getElementById('btnToggleSelection');
            if (btnToggle) btnToggle.textContent = 'Chọn';
            const btnBatch = document.getElementById('btnBatchDelete');
            if (btnBatch) btnBatch.style.display = 'none';

            // Load their media
            const mediaRes = await fetch(`/api/profile/${username}/media`);
            if (mediaRes.ok) {
                const mediaList = await mediaRes.json();
                this.renderMediaGridTo('profileMediaGrid', mediaList);
            }
        } catch(e) { console.error(e); }
        finally { this.showLoader(false); }
    },

    
    toggleCardSelection(card, event) {
        if (!this.state.isSelectionMode) return;
        if (event.target.classList.contains('batch-delete-cb')) return;
        const cb = card.querySelector('.batch-delete-cb');
        if (cb) {
            cb.checked = !cb.checked;
            this.updateBatchDeleteBtn();
        }
    },

    selectAllMedia() {
        const checkboxes = document.querySelectorAll('.batch-delete-cb');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        
        checkboxes.forEach(cb => {
            cb.checked = !allChecked;
        });
        
        const btn = document.getElementById('btnSelectAll');
        if (btn) btn.textContent = allChecked ? 'Chọn tất cả' : 'Bỏ chọn tất cả';
        
        this.updateBatchDeleteBtn();
    },

    toggleSelectionMode() {
        this.state.isSelectionMode = !this.state.isSelectionMode;
        const btnToggle = document.getElementById('btnToggleSelection');
        const btnSelectAll = document.getElementById('btnSelectAll');
        const grid = document.getElementById('profileMediaGrid');

        if (this.state.isSelectionMode) {
            btnToggle.textContent = 'Hủy chọn';
            if (btnSelectAll) btnSelectAll.style.display = 'inline-block';
            if (btnSelectAll) btnSelectAll.textContent = 'Chọn tất cả';
            grid.classList.add('selection-mode');
        } else {
            btnToggle.textContent = 'Chọn';
            if (btnSelectAll) btnSelectAll.style.display = 'none';
            grid.classList.remove('selection-mode');
            document.querySelectorAll('.batch-delete-cb').forEach(cb => cb.checked = false);
            this.updateBatchDeleteBtn();
        }
    },

    updateBatchDeleteBtn() {
        const checked = document.querySelectorAll('.batch-delete-cb:checked').length;
        const btn = document.getElementById('btnBatchDelete');
        const countEl = document.getElementById('batchDeleteCount');
        if (checked > 0) {
            btn.style.display = 'inline-flex';
            countEl.textContent = checked;
        } else {
            btn.style.display = 'none';
        }
    },

    async deleteSelectedMedia() {
        const checkboxes = document.querySelectorAll('.batch-delete-cb:checked');
        if (checkboxes.length === 0) return;
        if (!confirm(`Bạn có chắc chắn muốn xóa ${checkboxes.length} bài hát đã chọn không?`)) return;
        const mediaIds = Array.from(checkboxes).map(cb => cb.value);
        this.showLoader(true);
        try {
            const res = await fetch('/api/media/batch', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${this.state.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ media_ids: mediaIds })
            });
            if (res.ok) {
                const data = await res.json();
                this.showToast(`Đã xóa ${data.deleted_count} bài hát`);
                this.loadProfile(this.state.currentProfileUsername);
                document.getElementById('btnBatchDelete').style.display = 'none';
            } else {
                const data = await res.json();
                this.showToast(data.detail || 'Lỗi khi xóa hàng loạt', true);
            }
        } catch(e) { this.showToast('Lỗi mạng', true); }
        finally { this.showLoader(false); }
    },

    async deleteSingleMediaFromProfile(mediaId) {
        if (!confirm('Bạn có chắc chắn muốn xóa bài hát này?')) return;
        this.showLoader(true);
        try {
            const res = await fetch(`/api/media/${mediaId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                this.showToast('Đã xóa bài hát');
                if (this.state.currentProfileUsername) { this.loadProfile(this.state.currentProfileUsername); } else { this.loadMedia(true); }
            } else {
                const data = await res.json();
                this.showToast(data.detail || 'Không thể xóa', true);
            }
        } catch(e) { this.showToast('Lỗi mạng', true); }
        finally { this.showLoader(false); }
    },

    openKebabMenu(e, mediaId, channelName) {
        e.stopPropagation();
        const existing = document.getElementById('global-kebab-menu');
        if (existing) existing.remove();

        const rect = e.currentTarget.getBoundingClientRect();
        const menu = document.createElement('div');
        menu.id = 'global-kebab-menu';
        menu.className = 'global-dropdown-menu';
        menu.style.top = `${rect.bottom + window.scrollY + 8}px`;
        menu.style.left = `${rect.right + window.scrollX - 120}px`;

        // Only show edit if the user is the owner (not admin viewing others)
        let editOption = '';
        if (channelName === this.state.username || this.state.isAdmin) {
            editOption = `
                <div class="dropdown-item" onclick="app.openEditMediaModalFromProfile('${mediaId}'); document.getElementById('global-kebab-menu').remove();">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    Sửa bài hát
                </div>`;
        }

        menu.innerHTML = `
            ${editOption}
            <div class="dropdown-item delete" onclick="app.deleteSingleMediaFromProfile('${mediaId}'); document.getElementById('global-kebab-menu').remove();">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                Xóa
            </div>`;
        document.body.appendChild(menu);
    },

    renderMediaGridTo(targetId, mediaList) {
        const grid = document.getElementById(targetId);
        grid.innerHTML = '';

        if (mediaList.length === 0) {
            grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;">Chưa có bài hát nào.</p>';
            return;
        }

        // SVG icons cho Source Tags (platform recognition)
        const badgeIcons = {
            LOCAL: `<svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
            YOUTUBE: `<svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
            SPOTIFY: `<svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
            SOUNDCLOUD: `<svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M11.17 12.18v9.82H2c-1.1 0-2-.9-2-2v-4.44c0-2.02 1.35-3.8 3.26-4.27.47-1.89 2.18-3.3 4.22-3.3 1.25 0 2.39.53 3.2 1.38.16.17.31.35.49.81zm10.83-1.34c0-.85-.68-1.54-1.54-1.54-.34 0-.66.11-.93.31l-7.07 5.14v7.25h9.54v-11.16z"/></svg>`
        };

        mediaList.forEach(m => {
            const card = document.createElement('div');
            card.className = 'media-card';
            // data-source cho CSS Cinematic Glow theo platform
            card.setAttribute('data-source', m.sourceType);
            card.onclick = (e) => {
                if (this.state.isSelectionMode) {
                    this.toggleCardSelection(card, e);
                } else {
                    this.navigate('watch', m.id);
                }
            };

            let badgeClass = m.sourceType === 'LOCAL' ? 'badge-local' : (m.sourceType === 'YOUTUBE' ? 'badge-youtube' : (m.sourceType === 'SOUNDCLOUD' ? 'badge-soundcloud' : 'badge-spotify'));
            let badgeIcon = badgeIcons[m.sourceType] || badgeIcons.LOCAL;

            let thumbnailContent = '';
            if (m.sourceType === 'YOUTUBE') {
                const ytId = m.resource.includes('v=') ? m.resource.split('v=')[1].split('&')[0] : m.resource.split('/').pop();
                thumbnailContent = `<img src="https://img.youtube.com/vi/${ytId}/maxresdefault.jpg" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`;
            } else {
                // Cinematic fallback: gradient + icon Play chìm (opacity 20%)
                thumbnailContent = `<div class="thumb-fallback thumb-zoom-target">
                    <svg class="fallback-play-icon" width="48" height="48" viewBox="0 0 24 24" fill="rgba(240,140,90,0.9)" style="filter: drop-shadow(0 2px 8px rgba(224,90,58,0.3));"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>`;
            }

            let controlsContent = '';
            if (m.channelName === this.state.username || this.state.isAdmin) {
    controlsContent = `
        <div class="kebab-container" style="position:absolute;top:-4px;right:-8px;z-index:10;" onclick="event.stopPropagation()">
            <button class="btn-kebab" onclick="app.openKebabMenu(event, '${m.id}', '${m.channelName}')" style="background:transparent; border:none; color:var(--text-color); cursor:pointer; padding:4px; opacity:0.7; transition:opacity 0.2s;" onmouseenter="this.style.opacity=1" onmouseleave="this.style.opacity=0.7">
                <i class="ph ph-dots-three-vertical" style="font-size: 20px;"></i>
            </button>
        </div>`;
}

            let tagsHtml = '';
            if (m.category && m.category !== 'Khác' && m.category !== '') {
                tagsHtml = `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;">${m.category.split(',').map(c => `<span style="font-size:0.7rem;color:var(--accent-secondary);opacity:0.8;">#${c.trim()}</span>`).join('')}</div>`;
            }

            let uploaderHtml = '';
            if (m.channelName) {
                uploaderHtml = `<div style="font-size: 0.75rem; color: var(--text-muted); opacity: 0.8; margin-top: 4px; display: flex; align-items: center; gap: 4px;" title="Người đăng">
                    <i class="ph ph-user" style="font-size: 12px;"></i>
                    ${m.channelName} &bull; ${m.views !== undefined ? m.views : 0} <span data-i18n="views">lượt xem</span>
                </div>`;
            }

            card.innerHTML = `
    <input type="checkbox" class="batch-delete-cb" value="${m.id}" onchange="app.updateBatchDeleteBtn()">
            <div class="media-card-thumbnail" style="position:relative; border-radius:12px; overflow:hidden;">
        ${thumbnailContent}
        <span class="media-source-badge ${badgeClass}">${badgeIcon}${m.sourceType}</span>
    </div>
    <div class="media-card-content" style="display:flex; gap:12px; margin-top:12px; padding:0;">
        <div class="channel-avatar" style="width:36px;height:36px;font-size:0.95rem;flex-shrink:0;">${m.channelName.charAt(0).toUpperCase()}</div>
        <div class="media-card-info" style="flex:1; min-width:0; position:relative; padding-right: 24px;">
            <div class="media-card-title" title="${m.title}${m.author || m.Author ? ' - ' + (m.author || m.Author) : ''}" style="font-size:1rem; font-weight:700; line-height:1.4; color:#f8f8f2; display: flex; align-items: baseline; margin-top: 4px;">
                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-shrink: 1;">${m.title}</span>
                ${m.author || m.Author ? `<span style=\"white-space: nowrap; flex-shrink: 0; color: #9ca3af; font-weight: 400; font-size: 0.85em;\">&nbsp;- ${m.author || m.Author}</span>` : ''}
            </div>
            ${tagsHtml}
              ${uploaderHtml}
            ${controlsContent}
        </div>
    </div>`;
            grid.appendChild(card);
        });
    },

    /* ================= LIKED / DISLIKED ================= */
    async loadLikedMedia() {
        if (!this.state.token) { this.showToast('Vui lòng đăng nhập', true); this.navigate('auth'); return; }
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        document.getElementById('view-profile').classList.add('active');
        this.renderSkeletonGrid('profileMediaGrid', 8);
        try {
            const res = await fetch('/api/media/liked', { headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                const data = await res.json();
                document.getElementById('profileAvatar').style.display = 'none';
                document.querySelector('.profile-stats').style.display = 'none';
                document.getElementById('profileJoined').style.display = 'none';
                document.getElementById('profileUsername').textContent = `${this.state.username} — ${t('liked_songs')}`;
                this.renderMediaGridTo('profileMediaGrid', data);
                document.getElementById('profileActionBtns').style.display = 'none';
            }
        } catch(e) { console.error(e); }
        finally { this.showLoader(false); }
    },

    async loadDislikedMedia() {
        if (!this.state.token) { this.showToast('Vui lòng đăng nhập', true); this.navigate('auth'); return; }
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        document.getElementById('view-profile').classList.add('active');
        this.renderSkeletonGrid('profileMediaGrid', 8);
        try {
            const res = await fetch('/api/media/disliked', { headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                const data = await res.json();
                document.getElementById('profileAvatar').style.display = 'none';
                document.querySelector('.profile-stats').style.display = 'none';
                document.getElementById('profileJoined').style.display = 'none';
                document.getElementById('profileUsername').textContent = `${this.state.username} — ${t('disliked_songs')}`;
                this.renderMediaGridTo('profileMediaGrid', data);
                document.getElementById('profileActionBtns').style.display = 'none';
            }
        } catch(e) { console.error(e); }
        finally { this.showLoader(false); }
    },

    /* ================= SUBSCRIPTIONS ================= */
    async loadSubscriptions() {
        if (!this.state.token) return;
        try {
            const res = await fetch('/api/subscriptions', { headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                const subs = await res.json();
                this.state.subscriptions = subs;
                this.updateSubscribeButton();
                const area = document.getElementById('sidebarSubscriptionsArea');
                const list = document.getElementById('sidebarSubscriptionsList');
                if (subs.length > 0) {
                    area.style.display = 'block';
                    list.innerHTML = '';
                    const showCount = this.state.subsShowAll ? subs.length : Math.min(subs.length, 5);
                    for (let i = 0; i < showCount; i++) {
                        const s = subs[i];
                        list.innerHTML += `<div class="sidebar-item" onclick="app.navigate('profile','${s.username}'); app.toggleSidebar();"><div class="channel-avatar" style="width:24px;height:24px;font-size:0.7rem;">${s.username.charAt(0).toUpperCase()}</div> <span>${s.username}</span></div>`;
                    }
                    document.getElementById('btnShowMoreSubs').style.display = subs.length > 5 ? 'flex' : 'none';
                } else {
                    area.style.display = 'none';
                }
            }
        } catch(e) {}
    },

    showMoreSubscriptions() {
        this.state.subsShowAll = !this.state.subsShowAll;
        this.loadSubscriptions();
    },

    /* ================= PLAYLISTS ================= */
    async loadPlaylists() {
        this.showLoader(true);
        try {
            const res = await fetch('/api/playlists', { headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                const playlists = await res.json();
                const grid = document.getElementById('playlistGrid');
                grid.innerHTML = '';
                if (playlists.length === 0) {
                    grid.innerHTML = '<p style="color:var(--text-muted);">Bạn chưa có playlist nào.</p>';
                    return;
                }
                playlists.forEach(p => {
                    grid.innerHTML += `
                        <div class="glass-card" style="padding:1.5rem;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;" onmouseenter="this.style.transform='translateY(-4px)';this.style.boxShadow='var(--shadow-lg)'" onmouseleave="this.style.transform='';this.style.boxShadow=''" onclick="app.navigate('playlist-detail','${p.id}')">
                            <h3 style="font-size:1.1rem;margin-bottom:0.5rem;">${p.name}</h3>
                            <p style="font-size:0.85rem;color:var(--text-muted);">${p.item_count} bài hát</p>
                            <button class="btn btn-secondary" style="margin-top:0.8rem;padding:0.3rem 0.8rem;font-size:0.8rem;color:#ef4444;border-color:#ef4444;" onclick="event.stopPropagation();app.deletePlaylist(${p.id})">Xóa</button>
                        </div>`;
                });
            }
        } catch(e) { console.error(e); }
        finally { this.showLoader(false); }
    },

    async createPlaylist() {
        const name = prompt('Tên playlist mới:');
        if (!name || name.trim() === '') return;
        const formData = new FormData();
        formData.append('name', name);
        try {
            const res = await fetch('/api/playlists', { method: 'POST', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: formData });
            if (res.ok) { this.showToast('Đã tạo playlist!'); this.loadPlaylists(); }
        } catch(e) { this.showToast('Lỗi', true); }
    },

    async deletePlaylist(playlistId) {
        if (!confirm('Xóa playlist này?')) return;
        try {
            const res = await fetch(`/api/playlists/${playlistId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) { this.showToast('Đã xóa playlist'); this.loadPlaylists(); }
        } catch(e) { this.showToast('Lỗi', true); }
    },

    async loadPlaylistDetail(playlistId) {
        this.showLoader(true);
        try {
            const res = await fetch(`/api/playlists/${playlistId}`, { headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                const data = await res.json();
                document.getElementById('playlistDetailName').innerHTML = `${data.name} <button class="btn btn-secondary" style="padding:0.2rem 0.5rem;font-size:0.8rem;margin-left:1rem;" onclick="app.editPlaylistName(${data.id}, '${data.name.replace(/'/g, "\\'")}')">Sửa tên</button>`;
                this.state.currentPlaylistId = data.id;
                this.state.currentPlaylistItems = data.items;
                const container = document.getElementById('playlistDetailItems');
                container.innerHTML = '';
                if (data.items.length === 0) {
                    container.innerHTML = '<p style="color:var(--text-muted);">Playlist trống.</p>';
                    return;
                }
                data.items.forEach((m, idx) => {
                    container.innerHTML += `
                        <div style="display:flex;align-items:center;gap:1rem;padding:0.8rem;border-radius:8px;transition:background 0.2s;cursor:pointer;" onmouseenter="this.style.background='var(--bg-surface-hover)'" onmouseleave="this.style.background='transparent'">
                            <span style="color:var(--text-muted);font-size:0.85rem;width:24px;">${idx + 1}</span>
                            <div style="flex:1;" onclick="app.navigate('watch','${m.id}?playlist=${data.id}')">
                                <div style="font-weight:500;">${m.title}${m.author && m.author !== 'Unknown' ? ' - ' + m.author : ''}</div>
                                <div style="font-size:0.8rem;color:var(--text-muted);">${m.channelName}</div>
                            </div>
                            <div style="display:flex;gap:4px;flex-shrink:0;align-items:center;">
                                <button class="btn btn-secondary" style="padding:0.2rem 0.5rem;font-size:0.75rem;" onclick="app.movePlaylistItem(${data.id}, ${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>▲</button>
                                <button class="btn btn-secondary" style="padding:0.2rem 0.5rem;font-size:0.75rem;" onclick="app.movePlaylistItem(${data.id}, ${idx}, 1)" ${idx === data.items.length - 1 ? 'disabled' : ''}>▼</button>
                                <button class="btn btn-secondary" style="padding:0.2rem 0.6rem;font-size:0.75rem;color:#ef4444;border-color:#ef4444;margin-left:4px;" onclick="app.removeFromPlaylist(${data.id},${m.id})">Xóa</button>
                            </div>
                        </div>`;
                });
            }
        } catch(e) { console.error(e); }
        finally { this.showLoader(false); }
    },

    async playAllPlaylist() {
        if (this.state.currentPlaylistItems && this.state.currentPlaylistItems.length > 0) {
            this.navigate('watch', `${this.state.currentPlaylistItems[0].id}?playlist=${this.state.currentPlaylistId}`);
        }
    },

    async editPlaylistName(playlistId, oldName) {
        const newName = prompt('Nhập tên mới cho playlist:', oldName);
        if (!newName || newName.trim() === '' || newName === oldName) return;
        const formData = new FormData();
        formData.append('name', newName.trim());
        try {
            const res = await fetch(`/api/playlists/${playlistId}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: formData });
            if (res.ok) {
                this.showToast('Đã đổi tên playlist');
                this.loadPlaylistDetail(playlistId);
                this.loadPlaylists();
            } else {
                this.showToast('Lỗi khi đổi tên', true);
            }
        } catch(e) {}
    },

    async movePlaylistItem(playlistId, index, direction) {
        const items = [...this.state.currentPlaylistItems];
        if (index + direction < 0 || index + direction >= items.length) return;
        
        const temp = items[index];
        items[index] = items[index + direction];
        items[index + direction] = temp;
        
        this.state.currentPlaylistItems = items;
        const mediaIds = items.map(m => m.id);
        
        try {
            const res = await fetch(`/api/playlists/${playlistId}/reorder`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${this.state.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ media_ids: mediaIds })
            });
            if (res.ok) {
                this.loadPlaylistDetail(playlistId);
            }
        } catch(e) {}
    },

    async addToPlaylist(mediaId) {
        if (!this.state.token) { this.showToast('Vui lòng đăng nhập', true); return; }
        try {
            const res = await fetch('/api/playlists', { headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                const playlists = await res.json();
                const select = document.getElementById('playlistSelectDropdown');
                select.innerHTML = '';
                if (playlists.length === 0) {
                    select.innerHTML = '<option value="">Chưa có playlist</option>';
                } else {
                    playlists.forEach(p => { select.innerHTML += `<option value="${p.id}">${p.name} (${p.item_count})</option>`; });
                }
                this.state.addToPlaylistMediaId = mediaId;
                document.getElementById('addToPlaylistModal').style.display = 'flex';
            }
        } catch(e) {}
    },

    closeAddToPlaylistModal() {
        document.getElementById('addToPlaylistModal').style.display = 'none';
    },

    async confirmAddToPlaylist() {
        const playlistId = document.getElementById('playlistSelectDropdown').value;
        if (!playlistId) { this.showToast('Chọn một playlist', true); return; }
        const formData = new FormData();
        formData.append('media_id', this.state.addToPlaylistMediaId);
        try {
            const res = await fetch(`/api/playlists/${playlistId}/items`, { method: 'POST', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: formData });
            if (res.ok) { this.showToast('Đã thêm vào playlist!'); this.closeAddToPlaylistModal(); }
            else { const data = await res.json(); this.showToast(data.detail || 'Lỗi', true); }
        } catch(e) { this.showToast('Lỗi', true); }
    },

    async removeFromPlaylist(playlistId, mediaId) {
        try {
            const res = await fetch(`/api/playlists/${playlistId}/items/${mediaId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) { this.showToast('Đã xóa khỏi playlist'); this.loadPlaylistDetail(playlistId); }
        } catch(e) { this.showToast('Lỗi', true); }
    },

    /* ================= HISTORY ================= */
    async loadHistory() {
        this.showLoader(true);
        try {
            const res = await fetch('/api/history', { headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                const entries = await res.json();
                const list = document.getElementById('historyList');
                list.innerHTML = '';
                if (entries.length === 0) {
                    list.innerHTML = '<p style="color:var(--text-muted);">Chưa có lịch sử nghe.</p>';
                    return;
                }
                entries.forEach(m => {
                    let thumb = '';
                    if (m.sourceType === 'YOUTUBE') {
                        const ytId = m.resource.includes('v=') ? m.resource.split('v=')[1].split('&')[0] : m.resource.split('/').pop();
                        thumb = `<img src="https://img.youtube.com/vi/${ytId}/mqdefault.jpg" style="width:120px;height:68px;object-fit:cover;border-radius:8px;flex-shrink:0;">`;
                    } else {
                        thumb = `<div style="width:120px;height:68px;background:linear-gradient(135deg,#1c1210,#3d2218);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(240,140,90,0.6)" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></div>`;
                    }
                    list.innerHTML += `
                        <div style="display:flex;gap:1rem;padding:0.8rem;border-radius:8px;cursor:pointer;transition:background 0.2s;" onmouseenter="this.style.background='var(--bg-surface-hover)'" onmouseleave="this.style.background='transparent'" onclick="app.navigate('watch','${m.id}')">
                            ${thumb}
                            <div>
                                <div style="font-weight:500;">${m.title}${m.author && m.author !== 'Unknown' ? ' - ' + m.author : ''}</div>
                                <div style="font-size:0.8rem;color:var(--text-muted);">${m.channelName}</div>
                                ${m.watchedAt ? `<div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">${new Date(m.watchedAt).toLocaleString('vi-VN')}</div>` : ''}
                            </div>
                        </div>`;
                });
            }
        } catch(e) { console.error(e); }
        finally { this.showLoader(false); }
    },

    async clearHistory() {
        if (!confirm('Xóa toàn bộ lịch sử nghe?')) return;
        try {
            const res = await fetch('/api/history', { method: 'DELETE', headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) { this.showToast('Đã xóa lịch sử'); this.loadHistory(); }
        } catch(e) { this.showToast('Lỗi', true); }
    },

    /* ================= ADMIN ================= */
    async loadAdminSettings() {
        this.showLoader(true);
        try {
            const res = await fetch('/api/admin/settings', { headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                const data = await res.json();
                document.getElementById('adminMaxAccounts').value = data.max_total_accounts;
                document.getElementById('adminMaxUploads').value = data.max_uploads_per_user;
            } else {
                this.showToast('Không có quyền truy cập Admin', true);
                this.navigate('home');
            }
        } catch (e) { console.error(e); }
        finally { this.showLoader(false); }
    },

    async saveAdminSettings(event) {
        event.preventDefault();
        const maxAcc = parseInt(document.getElementById('adminMaxAccounts').value);
        const maxUp = parseInt(document.getElementById('adminMaxUploads').value);
        const btn = document.getElementById('btnSaveAdmin');
        btn.disabled = true; btn.textContent = 'Đang lưu...';
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${this.state.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ max_total_accounts: maxAcc, max_uploads_per_user: maxUp })
            });
            if (res.ok) { this.showToast('Đã lưu cài đặt!'); }
            else { this.showToast('Có lỗi xảy ra', true); }
        } catch (e) { this.showToast('Không thể kết nối đến server', true); }
        finally { btn.disabled = false; btn.textContent = t('save_settings'); }
    },

    async loadAdminUsers() {
        try {
            const res = await fetch('/api/admin/users', { headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                const users = await res.json();
                const tbody = document.getElementById('adminUsersBody');
                tbody.innerHTML = '';
                users.forEach((u, idx) => {
                    if (u.Username === this.state.username) return;
                    const shortHash = u.PasswordHash ? u.PasswordHash.substring(0, 20) + '...' : 'N/A';
                    const fullHash = u.PasswordHash || 'N/A';
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><input type="checkbox" class="user-checkbox" value="${u.Username}" onchange="app.updateDeleteSelectedCount()"></td>
                        <td>${u.Username} ${u.IsAdmin ? '<span style="color:var(--accent-orange)">(Admin)</span>' : ''}</td>
                        <td style="max-width:200px;">
                            <div style="display:flex;align-items:center;gap:6px;">
                                <code id="hash-${idx}" style="font-size:0.7rem;color:var(--text-muted);word-break:break-all;cursor:pointer;" title="Click để xem đầy đủ" onclick="this.textContent = this.textContent.length > 25 ? '${fullHash.replace(/'/g, "\\'")}' : '${shortHash}'">${shortHash}</code>
                            </div>
                        </td>
                        <td>${u.TotalUploads}</td>
                        <td>${u.TotalLikesReceived}</td>
                        <td>${u.TotalDislikesReceived}</td>
                        <td style="white-space:nowrap;">
                            <button class="btn btn-secondary" style="padding:0.2rem 0.5rem;margin-right:0.3rem;" onclick="app.navigate('admin-media','${u.Username}')">${t('watch_video')}</button>
                            <button class="btn btn-secondary" style="padding:0.2rem 0.5rem;margin-right:0.3rem;color:var(--accent-cyan);border-color:var(--accent-cyan);" onclick="app.resetUserPassword('${u.Username}')">${t('reset_password')}</button>
                            <button class="btn btn-secondary" style="color:#ef4444;border-color:#ef4444;padding:0.2rem 0.5rem;" onclick="app.deleteUser('${u.Username}')">${t('delete')}</button>
                        </td>`;
                    tbody.appendChild(tr);
                });
                this.updateDeleteSelectedCount();
                document.getElementById('selectAllUsers').checked = false;
            }
        } catch(e) { console.error(e); }
    },

    async resetUserPassword(username) {
        const newPassword = prompt(`${t('prompt_new_password')} "${username}":`);
        if (!newPassword || newPassword.trim() === '') return;
        const formData = new FormData();
        formData.append('new_password', newPassword);
        try {
            const res = await fetch(`/api/admin/users/${username}/reset_password`, { method: 'POST', headers: { 'Authorization': `Bearer ${this.state.token}` }, body: formData });
            if (res.ok) { this.showToast(`Đã đặt lại mật khẩu cho "${username}"`); this.loadAdminUsers(); }
            else { const data = await res.json(); this.showToast(data.detail || 'Lỗi', true); }
        } catch(e) { this.showToast('Lỗi mạng', true); }
    },

    toggleSelectAllUsers() {
        const selectAll = document.getElementById('selectAllUsers').checked;
        document.querySelectorAll('.user-checkbox').forEach(cb => cb.checked = selectAll);
        this.updateDeleteSelectedCount();
    },

    updateDeleteSelectedCount() {
        const checkedCount = document.querySelectorAll('.user-checkbox:checked').length;
        document.getElementById('btnDeleteSelected').textContent = `${t('delete_selected')} (${checkedCount})`;
    },

    async deleteUser(username) {
        if (!confirm(`CẢNH BÁO: Bạn chuẩn bị XÓA VĨNH VIỄN tài khoản "${username}". Bạn có chắc không?`)) return;
        this._executeBatchDelete([username]);
    },

    async deleteSelectedUsers() {
        const checkboxes = document.querySelectorAll('.user-checkbox:checked');
        const usernames = Array.from(checkboxes).map(cb => cb.value);
        if (usernames.length === 0) { this.showToast('Vui lòng chọn ít nhất 1 tài khoản để xóa', true); return; }
        if (!confirm(`CẢNH BÁO: Bạn chuẩn bị XÓA VĨNH VIỄN ${usernames.length} tài khoản. Bạn có chắc không?`)) return;
        this._executeBatchDelete(usernames);
    },

    async _executeBatchDelete(usernames) {
        this.showLoader(true);
        try {
            const res = await fetch('/api/admin/users/delete_batch', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${this.state.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernames: usernames })
            });
            if (res.ok) { const data = await res.json(); this.showToast(data.message); this.loadAdminUsers(); }
            else { this.showToast('Không thể xóa', true); }
        } catch (e) { this.showToast('Không thể kết nối đến server', true); }
        finally { this.showLoader(false); }
    },

    async loadAdminUserMedia(username) {
        this.state.adminMediaUsername = username;
        document.getElementById('adminMediaUsername').textContent = username;
        document.getElementById('btnAdminMediaBatchDelete').style.display = 'none';
        document.getElementById('selectAllAdminMedia').checked = false;
        this.showLoader(true);
        try {
            const res = await fetch(`/api/admin/users/${username}/media`, { headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) {
                const mediaList = await res.json();
                const tbody = document.getElementById('adminMediaBody');
                tbody.innerHTML = '';
                if (mediaList.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:2rem;">Người dùng này chưa tải lên bài hát nào.</td></tr>';
                    return;
                }
                mediaList.forEach(m => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><input type="checkbox" class="admin-media-cb" value="${m.MediaID}" onchange="app.updateAdminMediaSelectedCount()"></td>
                        <td>${m.MediaID}</td>
                        <td><a href="#watch/${m.MediaID}" style="color:var(--accent-primary);text-decoration:none;">${m.Title}${m.Author && m.Author !== '' ? ' - ' + m.Author : ''}</a></td>
                        <td><span style="font-size:0.8rem;padding:2px 8px;border-radius:4px;background:${m.SourceType === 'YOUTUBE' ? 'rgba(255,0,51,0.15);color:#ff4466' : m.SourceType === 'SPOTIFY' ? 'rgba(29,185,84,0.15);color:#1db954' : m.SourceType === 'SOUNDCLOUD' ? 'rgba(255,85,0,0.15);color:#ff5500' : 'rgba(59,130,246,0.15);color:#60a5fa'};">${m.SourceType}</span></td>
                        <td>${m.ViewsCount}</td>
                        <td><i class="ph ph-thumbs-up"></i> ${m.TotalLikes} / <i class="ph ph-thumbs-down"></i> ${m.TotalDislikes}</td>
                        <td><button class="btn btn-secondary" style="color:#ef4444;border-color:#ef4444;padding:0.2rem 0.5rem;font-size:0.8rem;" onclick="app.adminDeleteUserMedia(${m.MediaID},'${username}')">Xóa</button></td>`;
                    tbody.appendChild(tr);
                });
            } else {
                this.showToast('Không thể tải danh sách', true);
                this.navigate('admin');
            }
        } catch (e) { console.error(e); }
        finally { this.showLoader(false); }
    },

    toggleSelectAllAdminMedia() {
        const selectAll = document.getElementById('selectAllAdminMedia').checked;
        document.querySelectorAll('.admin-media-cb').forEach(cb => cb.checked = selectAll);
        this.updateAdminMediaSelectedCount();
    },

    updateAdminMediaSelectedCount() {
        const count = document.querySelectorAll('.admin-media-cb:checked').length;
        const btn = document.getElementById('btnAdminMediaBatchDelete');
        document.getElementById('adminMediaSelectedCount').textContent = count;
        btn.style.display = count > 0 ? 'inline-flex' : 'none';
    },

    async adminDeleteSelectedMedia() {
        const checkboxes = document.querySelectorAll('.admin-media-cb:checked');
        if (checkboxes.length === 0) return;
        if (!confirm(`Bạn có chắc chắn muốn xóa ${checkboxes.length} bài hát đã chọn không?`)) return;
        const mediaIds = Array.from(checkboxes).map(cb => cb.value);
        this.showLoader(true);
        try {
            const res = await fetch('/api/media/batch', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${this.state.token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ media_ids: mediaIds })
            });
            if (res.ok) {
                const data = await res.json();
                this.showToast(`Đã xóa ${data.deleted_count} bài hát`);
                this.loadAdminUserMedia(this.state.adminMediaUsername);
            } else {
                const data = await res.json();
                this.showToast(data.detail || 'Lỗi khi xóa', true);
            }
        } catch(e) { this.showToast('Lỗi mạng', true); }
        finally { this.showLoader(false); }
    },

    async adminDeleteUserMedia(mediaId, username) {
        if (!confirm('Bạn có chắc chắn muốn xóa bài hát này?')) return;
        this.showLoader(true);
        try {
            const res = await fetch(`/api/media/${mediaId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${this.state.token}` } });
            if (res.ok) { this.showToast('Đã xóa bài hát'); this.loadAdminUserMedia(username); }
            else { const data = await res.json(); this.showToast(data.detail || 'Không thể xóa', true); }
        } catch (e) { this.showToast('Lỗi kết nối', true); }
        finally { this.showLoader(false); }
    }
};

// Start app
app.init();
