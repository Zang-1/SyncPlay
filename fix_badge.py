import re

with open('static/css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

badge_old = '''.media-source-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
}'''

badge_new = '''.media-source-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    gap: 4px;
}

.badge-icon {
    width: 14px;
    height: 14px;
    display: inline-block;
    flex-shrink: 0;
}'''

if badge_old in css:
    css = css.replace(badge_old, badge_new)
else:
    css += '\\n\\n' + badge_new

with open('static/css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
