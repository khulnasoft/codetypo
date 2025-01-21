# output the list of repositories sorted
cat config/config.json \
| jq ".repositories | sort_by(.path | ascii_downcase) | .[].path  | select(startswith(\"streetside\") | not)" \
| jq -s '.' | tee ../.github/integrations.json

# codetypo:ignore downcase startswith streetside
