#!/usr/bin/env bash
set -eE

# default for development
dev_api="http://127.0.0.1:8000/"
id="none"
# set to API_URL env var or default if not present
api_url="${API_URL:-$dev_api}"
analytics="${G_ANALYTICS_ID:-$id}"

# create JSON data
json=$(cat <<-END
    {
        "API_URL": "$api_url",
        "G_ANALYTICS_ID":"$analytics"
    }
END
)

# safe it to config.json
echo "creating src/config.json"
echo "$json" > "src/config.json"