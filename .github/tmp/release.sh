#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
npm install --silent
npm run build
export REPO_VERSION ORG_NAME REPO_NAME
node ./makefiles.mjs
git add :/.github/README.md :/index.min.mjs :/.github/tmp/LAST_VERSION.txt
git commit -S -m "chore: update to $REPO_VERSION"
git push origin HEAD
gh release create "$REPO_VERSION" --repo "${ORG_NAME}/${REPO_NAME}" --title "$REPO_VERSION" --notes-file ./release.md
