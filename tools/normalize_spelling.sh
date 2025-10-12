#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# Spell Normalization Helper
# Converts between British and American English suffixes (e.g., -ize vs -ise)
# and prints transformation pairs (e.g., "colourise->colorize").
#
# Usage:
#   ./normalize_spelling.sh <input_file>
#
# -----------------------------------------------------------------------------

set -euo pipefail
IFS=$'\n\t'

# -----------------------------------------------------------------------------
# Helper: Join patterns with OR (for grep regex)
# -----------------------------------------------------------------------------
one_of() {
    local list=("$@")
    local joined
    joined='\(\('"${list[*]// /\\)\\|\\(}"'\)\)'
    echo "$joined"
}

# -----------------------------------------------------------------------------
# Patterns and word lists
# -----------------------------------------------------------------------------
SUFFIXES=(
    "ize" "izes" "izer" "izable" "ized"
    "izing" "izement" "ization" "izations"
)
PAT_SUFFIXES="$(one_of "${SUFFIXES[@]}")$"

EXCEPTIONS=('defenc' 'focuss')
PAT_EXCEPTIONS="^$(one_of "${EXCEPTIONS[@]}")"

IGNORE=('storey' 'practise' 'programme' 'licence')
PAT_IGNORE="^$(one_of "${IGNORE[@]}")"

# -----------------------------------------------------------------------------
# Input check
# -----------------------------------------------------------------------------
if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <input_file>" >&2
    exit 1
fi

INPUT_FILE="$1"
if [[ ! -f "$INPUT_FILE" ]]; then
    echo "Error: File not found — $INPUT_FILE" >&2
    exit 1
fi

# -----------------------------------------------------------------------------
# Generate transformation pairs
# -----------------------------------------------------------------------------
{
    # Find words that match US spellings or exceptions, but not ignored ones
    grep -E -e "$PAT_SUFFIXES" -e "$PAT_EXCEPTIONS" "$INPUT_FILE" \
        | grep -Ev "$PAT_IGNORE" \
        | grep -Ev '^(colouris|favouris)'

    # Generate specific exception corrections
    for suffix in e es ed ing ation ations er able; do
        echo "colouris${suffix}->colouriz${suffix}"
        echo "coloriz${suffix}->colouriz${suffix}"
    done

    for suffix in e es ed ing able; do
        echo "favouris${suffix}->favouriz${suffix}"
        echo "favoriz${suffix}->favouriz${suffix}"
    done

    # Invert pairs for reverse lookup (UK <-> US)
    grep -Ev -e "$PAT_SUFFIXES" -e "$PAT_EXCEPTIONS" "$INPUT_FILE" \
        | grep -Ev "$PAT_IGNORE" \
        | sed -E 's/^(.*)->(.*)$/\2->\1/'
} | sort -f -t- -k 1b,1
