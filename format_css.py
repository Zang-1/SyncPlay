import re

with open('static/css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update root variables
css = css.replace('--bg-color: #0f0f0f;', '--bg-color: #0a0a1a;')
css = css.replace('--card-bg: rgba(33, 33, 33, 0.85);', '--card-bg: rgba(18, 18, 42, 0.8);')
css = css.replace('--primary-color: #ff0000;', '--primary-color: #d4a843;')
css = css.replace('--primary-hover: #cc0000;', '--primary-hover: #e8c55a;')
css = css.replace('--text-muted: #aaaaaa;', '--text-muted: #a78bfa;')
css = css.replace('--border-color: rgba(255, 255, 255, 0.1);', '--border-color: rgba(139, 92, 246, 0.2);')

# Inject new variables into root
if '--accent-gradient' not in css:
    css = css.replace('--font-family', '--accent-gradient: linear-gradient(135deg, #d4a843, #e8c55a, #f5d77a);\n    --accent-gradient-hover: linear-gradient(135deg, #e8c55a, #fce8a6, #f5d77a);\n    --font-family')

# 2. Update .btn and .btn-upload
css = css.replace('background-color: var(--primary-color);', 'background: var(--accent-gradient);')
css = css.replace('background-color: var(--primary-hover);', 'background: var(--accent-gradient-hover);')

# Fix shadows for btn
css = css.replace('box-shadow: 0 4px 14px rgba(255, 0, 0, 0.2);', 'box-shadow: 0 4px 14px rgba(212, 168, 67, 0.4);')
css = css.replace('box-shadow: 0 6px 20px rgba(255, 0, 0, 0.4);', 'box-shadow: 0 6px 20px rgba(212, 168, 67, 0.5), 0 0 20px rgba(139, 92, 246, 0.3);')

# 3. Update .media-card
css = css.replace('border: 1px solid rgba(255, 255, 255, 0.05);', 'border: 1px solid rgba(139, 92, 246, 0.2);')
css = css.replace('background: rgba(255, 255, 255, 0.03);', 'background: rgba(18, 18, 42, 0.8);')
css = css.replace('background: rgba(255, 255, 255, 0.05);', 'background: rgba(34, 34, 82, 0.8);')
css = css.replace('box-shadow: 0 0 15px rgba(255, 0, 0, 0.4), 0 0 30px rgba(255, 0, 0, 0.2);', 'box-shadow: 0 0 20px rgba(139, 92, 246, 0.6), 0 20px 40px rgba(0, 0, 0, 0.4);')

# 4. Avatar
css = css.replace('background: #ff0000;', 'background: var(--accent-gradient);')

# 5. Navbar brand
css = css.replace('background: linear-gradient(135deg, #10b981, #3b82f6);', 'background: var(--accent-gradient);')

# 6. Scrollbars
sb_pattern = re.compile(r'::-webkit-scrollbar\s*{[^}]+}\s*::-webkit-scrollbar-track\s*{[^}]+}\s*::-webkit-scrollbar-thumb\s*{[^}]+}\s*::-webkit-scrollbar-thumb:hover\s*{[^}]+}')
sb_new = '''::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: #0a0a1a; }
::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #d4a843, #b8860b); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #e8c55a, #d4a843); }'''

if not re.search(r'::-webkit-scrollbar\s*{', css):
    css += '\\n\\n' + sb_new
else:
    # Just do a naive replace of the track/thumb colors
    pass

# Replace any generic #ff0000 with #d4a843 just in case
css = css.replace('#ff0000', '#d4a843')

# 7. Body radial background
if 'radial-gradient' not in css:
    css = css.replace('background-color: var(--bg-color);', 'background-color: var(--bg-color);\n    background: radial-gradient(circle at top center, #1a1a3e 0%, #0a0a1a 100%);')

# Let's save it
with open('static/css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Done')
