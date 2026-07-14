
# Append category and other missing styles that were lost from the 1530-line version

css = '''
/* Category Filters */
.category-filters { display: flex; gap: 0.75rem; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: none; }
.category-filters::-webkit-scrollbar { display: none; }
.btn-category { background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: var(--text-color); padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem; cursor: pointer; white-space: nowrap; transition: var(--transition); }
.btn-category:hover { background: rgba(255,255,255,0.1); }
.btn-category.active { background: var(--accent-gradient); border: none; color: white; font-weight: 600; box-shadow: 0 4px 10px rgba(212, 168, 67, 0.4); padding: 0.4rem 1rem; }
.badge-category { background: rgba(255, 255, 255, 0.2); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; margin-left: 0.5rem; }
.category-wrapper { position: relative; display: flex; align-items: center; flex: 1; overflow: hidden; }
.category-scroll-btn {
    background: rgba(18, 18, 42, 0.9);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    z-index: 10;
    transition: all 0.2s;
    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}
.category-scroll-btn:hover { background: var(--primary-color); color: white; border-color: transparent; }
.category-scroll-btn.left { left: 0; }
.category-scroll-btn.right { right: 0; }
.category-scroll-btn.hide-btn { display: none; }
.category-divider { width: 1px; height: 24px; background: linear-gradient(180deg, transparent, rgba(212, 168, 67, 0.8), rgba(139, 92, 246, 0.8), transparent); margin: 0 0.5rem; border: none; }
'''

with open('static/css/style.css', 'a', encoding='utf-8') as f:
    f.write(css)

print('Done')
