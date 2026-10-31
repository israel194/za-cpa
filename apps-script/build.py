r"""Build apps-script/Code.gs from Code.src.gs.

Every non-ASCII character outside comments becomes a \uXXXX escape, so the
deployed script is pure ASCII: copy/paste or editor encoding can never reverse
or garble the Hebrew again. Run: py apps-script/build.py
"""

from pathlib import Path

HERE = Path(__file__).resolve().parent


def escape_line(line: str) -> str:
    stripped = line.lstrip()
    if stripped.startswith(('//', '/*', '*')):
        return line  # comments stay readable
    return ''.join(c if ord(c) < 128 else chr(92) + 'u%04X' % ord(c) for c in line)


src = (HERE / 'Code.src.gs').read_text(encoding='utf-8')
body = '\n'.join(escape_line(l) for l in src.split('\n'))
header = '// GENERATED from Code.src.gs by build.py. Edit the source, not this file.\n'
(HERE / 'Code.gs').write_text(header + body, encoding='utf-8', newline='\n')
print('Code.gs written,', sum(1 for c in body if ord(c) > 127), 'non-ASCII chars left (comments only)')
