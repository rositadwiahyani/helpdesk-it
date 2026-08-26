import re

file_path = "c:/xampp/htdocs/clone-laporan-kp/helpdesk-it/backend/src/services/botService.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add getTriggerWord function
trigger_func = """
function getTriggerWord(): string {
  const settings = getBotSettings();
  return settings.trigger_word || 'HaloDesk';
}
"""
if "function getTriggerWord()" not in content:
    content = content.replace("function getBotSettings()", trigger_func + "\nfunction getBotSettings()")

# 2. Replace hardcoded matching logic in processMessage (line 100)
# 'halodesk' -> getTriggerWord().toLowerCase()
content = re.sub(
    r"\['halodesk', 'batal', 'menu'\]",
    r"[getTriggerWord().toLowerCase(), 'batal', 'menu']",
    content
)

# 3. Replace all literal string occurrences of HaloDesk with ${getTriggerWord()} or similar
# e.g., "Ketik *HaloDesk*" -> `Ketik *${getTriggerWord()}*`
# We have to be careful with quotes.
# Example: "❌ Sesi dibatalkan. Ketik *HaloDesk* jika ingin memulai lagi."
# if it's already a template literal (`), just replace HaloDesk with ${getTriggerWord()}
content = re.sub(
    r"`([^`]*)HaloDesk([^`]*)`",
    r"`\1${getTriggerWord()}\2`",
    content
)

# If it's a double quoted string: "Ketik *HaloDesk* untuk kembali ke menu utama."
# Convert to template literal and replace.
def replace_double_quotes(match):
    inner = match.group(1)
    if "HaloDesk" in inner:
        new_inner = inner.replace("HaloDesk", "${getTriggerWord()}")
        return f"`{new_inner}`"
    return match.group(0)

content = re.sub(
    r'"([^"\n]*HaloDesk[^"\n]*)"',
    replace_double_quotes,
    content
)

# If it's a single quoted string: '...HaloDesk...'
def replace_single_quotes(match):
    inner = match.group(1)
    if "HaloDesk" in inner:
        new_inner = inner.replace("HaloDesk", "${getTriggerWord()}")
        return f"`{new_inner}`"
    return match.group(0)

content = re.sub(
    r"'([^'\n]*HaloDesk[^'\n]*)'",
    replace_single_quotes,
    content
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done replacing HaloDesk")
