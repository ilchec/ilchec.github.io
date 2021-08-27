from transliterate import translit, get_available_language_codes
import sys
text = ""
for line in sys.stdin.readlines():
	text += line
print(translit(text, 'ru', reversed=True))