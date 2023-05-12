#!/bin/sh

set -e

find /app/ \
  -type f \
  -name '*.*' \
  -exec sed -i "s+%%PRODUCTION%%+${PRODUCTION:-false}+g" '{}' \; \
  -exec sed -i "s+%%HMR%%+${HMR:-false}+g" '{}' \; \
  -exec sed -i "s+%%ENV_NAME%%+${ENV_NAME:?}+g" '{}' \; \
  -exec sed -i "s+%%DEBUG%%+${DEBUG:-false}+g" '{}' \; \
  -exec sed -i "s+%%API_URL%%+${API_URL:?}+g" '{}' \; \
  -exec sed -i "s+%%APP_NAME%%+${APP_NAME:?}+g" '{}' \; \
  -exec sed -i "s+%%ENCRYPT_KEY%%+${ENCRYPT_KEY:?}+g" '{}' \; \
  -exec sed -i "s+%%SENTRY_DSN%%+${SENTRY_DSN:?}+g" '{}' \; \
  -exec sed -i "s+%%SOCKET_TYPE%%+${SOCKET_TYPE:?}+g" '{}' \; \
  -exec sed -i "s+%%CENTRIFUGO_URL%%+${CENTRIFUGO_URL:?}+g" '{}' \;

exec nginx -g 'daemon off;'
