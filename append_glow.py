css = '''
/* === TEXT GLOW EFFECTS === */
.text-glow-gold {
    color: #d4a843;
    text-shadow: 0 0 10px rgba(212, 168, 67, 0.6), 0 0 20px rgba(212, 168, 67, 0.3);
}

.text-glow-purple {
    color: #8b5cf6;
    text-shadow: 0 0 10px rgba(139, 92, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.3);
}
'''
with open('static/css/style.css', 'a', encoding='utf-8') as f:
    f.write(css)
