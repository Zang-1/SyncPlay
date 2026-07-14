import re

transcript_path = r'C:\Users\ADMIN\.gemini\antigravity-ide\brain\9bdaea84-d8b3-4c17-a6ee-ccaa8c6f0e11\.system_generated\logs\transcript_full.jsonl'

lines_dict = {}

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        # A simple search inside the json string.
        # Since it's JSON, the \n are escaped as \\n.
        # We can just unescape the line and then split it.
        try:
            # We don't need to parse the JSON. We can just decode the unicode escapes.
            text = line.encode('utf-8').decode('unicode_escape')
            if 'Total Lines: 1530' in text:
                for line_str in text.split('\\n'):
                    match = re.match(r'^(\d+): (.*)$', line_str)
                    if match:
                        line_num = int(match.group(1))
                        lines_dict[line_num] = match.group(2)
        except Exception:
            pass

if not lines_dict:
    print("Could not find the content.")
else:
    print(f"Recovered {len(lines_dict)} lines.")
    with open('static/css/style.css', 'w', encoding='utf-8') as f:
        for i in range(1, max(lines_dict.keys()) + 1):
            f.write(lines_dict.get(i, '') + '\n')
    print("Successfully recovered style.css!")
