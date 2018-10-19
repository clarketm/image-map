#!/usr/bin/env sh

cwd=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

version=$(cat "$cwd/package.json" | pcregrep -o1 '"version": "(.*)"')

curl -XPOST \
-H "Authorization: token $GITHUB_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
"https://api.github.com/repos/clarketm/image-map/releases" \
--data "{
  \"tag_name\": \"v$version\",
  \"target_commitish\": \"master\",
  \"name\": \"v$version\",
  \"draft\": false,
  \"prerelease\": false
}"
